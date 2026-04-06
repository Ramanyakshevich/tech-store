import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDto } from './dto/create-product.dto';
import slugify from 'slugify';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { Prisma } from '@prisma/client';

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

    async findAll(dto: GetAllProductDto){
        const { sort, searchTerm, page=1, perPage=10, categoryId } = dto

        const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ?{
            OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { description: { contains: searchTerm, mode: 'insensitive'}},
            ],
        } : {}

        const prismaCategoryFilter: Prisma.ProductWhereInput = categoryId ? {
            categoryId: categoryId
        } : {}

        let prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];
        if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' })
        else if (sort === EnumProductSort.HIGH_PRICE) prismaSort.push({ price: 'desc' })
        else if (sort === EnumProductSort.OLDEST) prismaSort.push({ createdAt: 'asc' })
        else prismaSort.push({ createdAt: 'desc' })

        const skip = (page - 1) * perPage

        const products = await this.prisma.product.findMany({
            where: {
                ...prismaSearchTermFilter,
                ...prismaCategoryFilter,
            },
            orderBy: prismaSort,
            skip: skip,
            take: perPage,
            include: {
                category: true,
            }
        })

        const total = await this.prisma.product.count({
            where: {
                ...prismaSearchTermFilter,
                ...prismaCategoryFilter,
            }
        })

        return {
            products,
            length: total,
            page,
            perPage
        }
    }

    findOne(id: number){
        return this.prisma.product.findUnique({
            where: {id}
        })
    }

    update(id: number, updateProductDto: any) { return `Update #${id}`; }
    remove(id: number) { return `Remove #${id}`; }
}
