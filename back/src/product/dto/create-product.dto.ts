import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createProductDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    slug: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    image: string
}