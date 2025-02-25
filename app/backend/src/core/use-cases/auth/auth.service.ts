import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../ports/user.repository.port';
import { JwtServicePort } from '../../ports/jwt.service.port';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../../entities/user.entity';
import { Inject } from '@nestjs/common';

export class AuthService {
  constructor(
    @Inject('UserRepositoryPort') readonly userRepository: UserRepositoryPort,
    @Inject('JwtServicePort') readonly jwtService: JwtServicePort,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    const { email, password } = registerDto;
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: User = { email, password: hashedPassword };
    const createdUser = await this.userRepository.create(userData);

    const payload = {
      id: String(createdUser.id),
      email: createdUser.email,
    };
    const accessToken = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = createdUser;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; user: Partial<User> }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: String(user.id), email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }
}
