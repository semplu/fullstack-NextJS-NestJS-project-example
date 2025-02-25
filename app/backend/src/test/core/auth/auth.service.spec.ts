import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../core/use-cases/auth/auth.service';
import { JwtServicePort } from '../../../core/ports/jwt.service.port';
import { UserRepositoryPort } from '../../../core/ports/user.repository.port';
import { RegisterDto } from '../../../core/use-cases/auth/dto/register.dto';

const mockUserRepository: jest.Mocked<UserRepositoryPort> = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

const mockJwtService: jest.Mocked<JwtServicePort> = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockUserRepository, mockJwtService);
    jest.clearAllMocks();
  });

  it('should successfully register a new user', async () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
    };
    const hashedPassword = '$2b$10$hashedpassword';
    const createdUser = {
      id: 'user-id-123',
      email: registerDto.email,
      password: hashedPassword,
    };

    mockUserRepository.findByEmail.mockImplementation(() =>
      Promise.resolve(null),
    );
    mockUserRepository.findById.mockImplementation(() => Promise.resolve(null));
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
    mockUserRepository.create.mockImplementation(() =>
      Promise.resolve(createdUser),
    );
    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await authService.register(registerDto);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: hashedPassword,
    });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      id: 'user-id-123',
      email: 'test@example.com',
    });
    expect(result).toEqual({
      accessToken: 'jwt-token',
      user: { id: 'user-id-123', email: 'test@example.com' },
    });
  });
});
