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

  async addToken(userId: string, token: string, userAgent: string) {
    return this.prisma.token.create({
      data: {
        token,
        userId,
        userAgent,
        exp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async getToken(token: string) {
    return this.prisma.token.findUnique({
      where: { token },
    });
  }

  async removeToken(token: string) {
    return this.prisma.token.delete({
      where: { token },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
