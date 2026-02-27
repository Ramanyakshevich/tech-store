import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/create-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() dto: createProductDto){
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
