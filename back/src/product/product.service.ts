import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDto } from './dto/create-product.dto';
import slugify from 'slugify';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService){}

    create(dto: createProductDto) {
        const slug = slugify(dto.name, { lower: true });

        return this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                image: dto.image,
                slug: dto.slug,
                categoryId: dto.categoryId,
            },
        });
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
