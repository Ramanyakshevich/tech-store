import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/create-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetAllProductDto } from './dto/get-all.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() dto: createProductDto){
    return this.productService.create(dto)
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() queryDto: GetAllProductDto){
    return this.productService.findAll(queryDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.productService.findOne(+id)
  }
}
