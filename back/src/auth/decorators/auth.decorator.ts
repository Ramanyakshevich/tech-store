import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';

export function Auth(role: 'USER' | 'ADMIN' = 'USER') {
  if (role === 'ADMIN') {
    return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
  }
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}