// import { Injectable } from '@nestjs/common';
// import { UpdateUserUseCase } from '@/app/modules/app/users/application/use-cases/update/update-user.use-case';
// import { ValidateTokenJwtAuthService } from '../../services/validate-token-jwt/validate-token-jwt-auth.service';
// import { BadRequestException } from '@/app/core/exceptions/bad-request.exception';
// import { CONTEXT_AUTH } from '../../constants/contexts';

// @Injectable()
// export class ResetPasswordAuthUseCase {
//   constructor(
//     private readonly updateUserUseCase: UpdateUserUseCase,
//     private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
//   ) {}

//   async execute(token: string, body: ResetPasswordAuthRequestDto) {
//     const data = await this.validateTokenJwtAuthService.execute({token, options: {}});

//     if(!data) {
//       throw new BadRequestException(CONTEXT_AUTH.RESET_PASSWORD, 'Invalid token');
//     }

//     return this.updateUserUseCase.execute({ userUuid: data.uuid, body });
//   }
// }