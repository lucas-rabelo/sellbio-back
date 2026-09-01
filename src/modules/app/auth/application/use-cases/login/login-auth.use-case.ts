import { CompareBcryptService } from '@/src/modules/shared/bcrypt/application/services/compare/compare-bcrypt.service';
import { GenerateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/generate-access-token/generate-access-token.use-case';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../../../infra/http/database/auth.repository';
import { CONTEXT_AUTH } from '../../constants/contexts';
import { CreateRefreshTokenService } from '../../services/create-refresh-token/create-refresh-token.service';
import { LoginAuthRequestProps, LoginAuthResponseProps } from './types';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly compareBcryptService: CompareBcryptService,
    private readonly createRefreshTokenService: CreateRefreshTokenService,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
  ) {}

  async execute(
    request: LoginAuthRequestProps,
  ): Promise<LoginAuthResponseProps> {
    const { email, password, meta } = request;

    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `${CONTEXT_AUTH.LOGIN} Credenciais inválidas`,
      );
    }

    const isPasswordValid = await this.compareBcryptService.execute(
      password,
      user.passwordHash.value,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        `${CONTEXT_AUTH.LOGIN} Credenciais inválidas`,
      );
    }

    const { accessToken } = await this.generateAccessTokenUseCase.execute({
      userUuid: user.uuid,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await this.createRefreshTokenService.execute(
      user.uuid,
      meta,
    );

    return { accessToken, refreshToken };
  }
}
