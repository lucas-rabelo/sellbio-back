import { AppController } from '@/app/infra/decorators/base/controller.decorator';
import { AppPost } from '@/app/infra/decorators/base/post.decorator';
import { Body } from '@nestjs/common';
import { RefreshTokenAuthUseCase } from '@/app/modules/app/auth/application/use-cases/refresh/refresh-token-auth.use-case';
import { RefreshAuthRequestDto, RefreshAuthResponseDto } from '@/app/modules/app/auth/dtos/refresh-auth.dto';

@AppController('Auth')
export class RefreshAuthController {
  constructor(
    private readonly useCase: RefreshTokenAuthUseCase,
  ) { }

  @AppPost({
    path: 'refresh',
    summary: 'Refresh access and refresh tokens',
    body: RefreshAuthRequestDto,
    okResponse: RefreshAuthResponseDto,
  })
  async handle(
    @Body() body: RefreshAuthRequestDto,
  ) {
    return this.useCase.execute(body);
  }
}