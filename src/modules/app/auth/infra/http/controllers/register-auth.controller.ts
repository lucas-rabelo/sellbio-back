import { AppController } from "@/app/infra/decorators/base/controller.decorator";
import { AppPost } from "@/app/infra/decorators/base/post.decorator";
import { Body } from "@nestjs/common";
import { RegisterAuthUseCase } from "../../../application/use-cases/register/register-auth.use-case";
import { RegisterAuthRequestDto, RegisterAuthResponseDto } from "../../../dtos/register-auth.dto";

@AppController('Auth')
export class RegisterAuthController {
  constructor(
    private readonly useCase: RegisterAuthUseCase
  ) { }

  @AppPost({
    path: 'register',
    summary: "Register a new user and return access and refresh tokens",
    body: RegisterAuthRequestDto,
    okResponse: RegisterAuthResponseDto,
  })
  async handle(
    @Body() body: RegisterAuthRequestDto
  ) {
    return this.useCase.execute(body);
  }
}