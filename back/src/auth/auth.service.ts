import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ){}

  async login(dto: AuthDto){
    const user = await this.userService.findByEmail(dto.email)

    if(!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if(!isValid) throw new UnauthorizedException('Invalid password')

    return {
      accessToken: await this.jwt.signAsync({
        id: user.id,
        email: user.email,
      })
    }
  }

  async register(dto: AuthDto){
    // registaration
  }
}
