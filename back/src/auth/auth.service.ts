import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private readonly configService: ConfigService,
  ){}

  async login(dto: AuthDto){
    const user = await this.userService.findByEmail(dto.email)

    if(!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if(!isValid) throw new UnauthorizedException('Invalid password')

    return this.issueTokens(user.id, 'IPhone 14 Pro Max')
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken).catch(() => {
        throw new UnauthorizedException('Invalid refresh token');
    });

    const tokenFromDb = await this.userService.getToken(refreshToken);
    if (!tokenFromDb) throw new UnauthorizedException('Refresh token not found');

    await this.userService.removeToken(refreshToken);

    return this.issueTokens(result.id, tokenFromDb.userAgent);
  }

  private async issueTokens(userId: string, userAgent: string) {
    const data = { id: userId };

    const accessToken = await this.jwt.signAsync(data, {
      expiresIn: this.configService.get('JWT_EXPIRE_IN'),
    });

    const refreshToken = await this.jwt.signAsync(data, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    await this.userService.addToken(userId, refreshToken, userAgent);

    return { accessToken, refreshToken };
  }

  async register(dto: AuthDto){
    // registaration
  }
}
