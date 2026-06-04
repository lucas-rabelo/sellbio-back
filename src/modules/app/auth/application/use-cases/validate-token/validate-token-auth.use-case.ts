import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { NotFoundException } from '@/src/core/exceptions/not-found.exception';
import { FindByUuidUserService } from '@/src/modules/app/users/application/services/find-by-uuid/find-by-uuid-user.service';
import { ValidateAccessTokenUseCase } from '@/src/modules/shared/jwt/application/services/validate-access-token/validate-access-token.use-case';
import { Injectable } from '@nestjs/common';
import { CONTEXT_AUTH } from '../../../application/constants/contexts';
import type {
  ValidateTokenAuthRequestProps,
  ValidateTokenAuthResponseProps,
} from './types';

@Injectable()
export class ValidateTokenAuthUseCase {
  constructor(
    private readonly validateTokenJwtService: ValidateAccessTokenUseCase,
    private readonly findByUuidUserService: FindByUuidUserService,
  ) {}

  async execute(
    request: ValidateTokenAuthRequestProps,
  ): Promise<ValidateTokenAuthResponseProps> {
    const { token } = request;

    const validated = await this.validateTokenJwtService.execute({ token });

    if (!validated) {
      throw new BadRequestException(
        CONTEXT_AUTH.VALIDATE_TOKEN,
        'Invalid token',
      );
    }

    const user = await this.findByUuidUserService.execute(validated.userUuid);

    if (!user) {
      throw new NotFoundException(CONTEXT_AUTH.VALIDATE_TOKEN);
    }

    return user;
  }
}
