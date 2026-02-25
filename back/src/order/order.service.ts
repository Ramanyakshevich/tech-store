import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';


@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService){}

  async create(dto: OrderDto){
    const productIds = dto.items.map(item => item.productId)

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds}},
    })

    if(products.length !== productIds.length){
      throw new NotFoundException('One or more products not found')
    }

    let totalAmount = 0

    const orderItemsData = dto.items.map(item => {
      const product = products.find(p => p.id === item.productId)

      if(!product){
        throw new NotFoundException(`Product with ID ${item.productId} not found`)
      }
      
      totalAmount += product.price * item.quantity

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      }
    })

    const order = await this.prisma.order.create({
      data: {
        userId: dto.userId,
        total: totalAmount,
        items:{
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    })

    return order
  }

  async getByUser(userId: string){
    return this.prisma.order.findMany({
      where: { userId },
      include:{ items: true},
      orderBy: { createdAt: 'desc' },
    })
  }
}
