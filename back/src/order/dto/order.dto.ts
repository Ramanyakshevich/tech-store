import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class OrderItemDto{
    @IsNumber()
    productId: number;

    @IsNumber()
    quantity: number;
}

export class OrderDto{
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: 'Order must contain at least one item' })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
}
