import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('category')
export class CategoryController{
  constructor(private readonly categoryService: CategoryService) {}

  @Auth('ADMIN')
  @Post()
  create(@Body() dto: {name : string, slug: string}){
    return this.categoryService.create(dto)
  }

  @Get()
  findAll(){
    return this.categoryService.findAll()
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string){
    return this.categoryService.findBySlug(slug)
  }
}
