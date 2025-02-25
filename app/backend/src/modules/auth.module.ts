import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmConfigModule } from '../adapters/database/typeorm.module';
import { AuthController } from '../adapters/auth/auth.controller';
import { JwtStrategy } from '../adapters/auth/jwt.strategy';
import { UserRepositoryAdapter } from '../adapters/database/user.repository';
import { JwtServiceAdapter } from '../adapters/auth/jwt.service';
import { AuthServiceAdapter } from '../adapters/auth/auth.service.adapter';

@Module({
  imports: [
    TypeOrmConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthServiceAdapter,
    JwtStrategy,
    { provide: 'UserRepositoryPort', useClass: UserRepositoryAdapter },
    { provide: 'JwtServicePort', useClass: JwtServiceAdapter },
  ],
})
export class AuthModule {}
