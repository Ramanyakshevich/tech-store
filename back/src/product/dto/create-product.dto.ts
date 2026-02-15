import { IsNumber, IsOptional, IsString } from "class-validator";

export class createProductDto{
    @IsString()
    name: string

    @IsString()
    slug: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    price: number

    @IsString()
    image: string
}