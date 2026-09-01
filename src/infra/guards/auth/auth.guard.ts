import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from './types';
import { ValidateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/validate-access-token/validate-access-token.use-case';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly validateTokenJwtService: ValidateAccessTokenUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const validated = await this.validateTokenJwtService.execute({ token });

      if (!validated || !validated.userUuid) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = {
        uuid: validated.userUuid,
        email: validated.email,
      };

      request.token = token;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: AuthenticatedRequest): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) return null;

    return token;
  }
}
