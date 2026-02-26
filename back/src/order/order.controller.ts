import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
    return this.orderService.create(dto, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getByUser(@Param('userId') userId: string){
    return this.orderService.getByUser(userId)
  }
}
