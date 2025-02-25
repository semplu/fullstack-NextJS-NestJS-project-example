import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtServicePort } from '../../core/ports/jwt.service.port';

@Injectable()
export class JwtServiceAdapter implements JwtServicePort {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: { id: string; email: string }): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }
}
