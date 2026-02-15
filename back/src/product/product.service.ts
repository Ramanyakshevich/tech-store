import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService){}

    create(createProductDto: any){
        return this.prisma.product.create({
            data: createProductDto
        })
    }

    findAll(){
        return this.prisma.product.findMany()
    }

    findOne(id: number){
        return this.prisma.product.findUnique({
            where: {id}
        })
    }

    update(id: number, updateProductDto: any) { return `Update #${id}`; }
    remove(id: number) { return `Remove #${id}`; }
}
