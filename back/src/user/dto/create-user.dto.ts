import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6, { message: 'The password must contains more than 6 characters' })
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
  
  @IsString()
  phoneNumber: string

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  houseNumber?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;
}
