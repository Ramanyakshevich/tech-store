import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: any){
    return this.productService.create(dto)
  }

  @Get()
  findAll(){
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productService.findOne(+id)
  }
}
