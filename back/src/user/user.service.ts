import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService){}

  async create(dto: CreateUserDto){
    const password = await hash(dto.password)

    const user = await this.prisma.user.create({
      data:{
        email: dto.email,
        password: password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        city: dto.city,
        street: dto.street,
        houseNumber: dto.houseNumber,
        zipCode: dto.zipCode,
      },
    })

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    }
  }

  findAll(){
    return this.prisma.user.findMany()
  }

  async findByEmail(email: string){
    return await this.prisma.user.findUnique({
      where:{
        email: email,
      }
    })
  }
}
