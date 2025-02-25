import { Injectable, Inject } from '@nestjs/common';
import { LoginDto } from '../../core/use-cases/auth/dto/login.dto';
import { RegisterDto } from '../../core/use-cases/auth/dto/register.dto';
import { AuthService } from '../../core/use-cases/auth/auth.service';
import { JwtServicePort } from '../../core/ports/jwt.service.port';
import { UserRepositoryPort } from '../../core/ports/user.repository.port';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class AuthServiceAdapter {
  private readonly authService: AuthService;

  constructor(
    @Inject('UserRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
    @Inject('JwtServicePort')
    private readonly jwtService: JwtServicePort,
  ) {
    this.authService = new AuthService(userRepository, jwtService);
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    return this.authService.register(registerDto);
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    return this.authService.login(loginDto);
  }

  async validateUser(userId: string): Promise<User> {
    return this.authService.validateUser(userId);
  }
}
