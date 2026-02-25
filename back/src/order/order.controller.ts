import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: OrderDto){
    return this.orderService.create(dto)
  }

  @Get('user/userId')
  getByUser(@Param('userId') userId: string){
    return this.orderService.getByUser(userId)
  }
}
