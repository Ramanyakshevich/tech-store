import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

export enum EnumProductSort{
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest',
}

export class GetAllProductDto{
    @IsOptional()
    @IsString()
    searchTerm?: string

    @IsOptional()
    @IsEnum(EnumProductSort)
    sort?: EnumProductSort

    @IsOptional()
    @IsString()
    categoryId?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    perPage?: number = 10
}