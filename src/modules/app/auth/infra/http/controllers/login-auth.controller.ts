import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppPost } from "@/app/infra/decorators/base/post.decorator";
import { Body } from "@nestjs/common";
import { LoginAuthUseCase } from "../../../application/use-cases/login/login-auth.use-case";
import { LoginAuthRequestDto, LoginAuthResponseDto } from "../../../dtos/login-auth.dto";

@AppController('Auth')
export class LoginAuthController {
  constructor(
    private readonly useCase: LoginAuthUseCase
  ) { }

  @AppPost({
    path: 'login',
    summary: "Login a user and return access and refresh tokens",
    body: LoginAuthRequestDto,
    okResponse: LoginAuthResponseDto,
  })
  async handle(
    @Body() body: LoginAuthRequestDto
  ) {
    return this.useCase.execute(body);
  }
}