import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService{
  constructor(private prisma: PrismaService){}

  create(dto: { name: string; slug: string}){
    return this.prisma.category.create({
      data: dto,
    })
  }

  findAll(){
    return this.prisma.category.findMany()
  }

  async findBySlug(slug: string){
    const category = await this.prisma.category.findUnique({
      where:  {slug},
      include: {
        products: true,
      },
    })
    if(!category) throw new NotFoundException('Category not found')
    return category
  }
}