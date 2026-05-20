# AuthGuard

Guard de autenticação para validar tokens JWT (access_token ou refresh_token) extraídos do header `Authorization` com esquema `Bearer`.

## Features

- ✅ Validação de access_token
- ✅ Validação de refresh_token
- ✅ Extração automática do token do header Authorization
- ✅ Suporte a Bearer token scheme
- ✅ Injeção de dados do usuário autenticado no request
- ✅ Tratamento robusto de erros

## Instalação e Uso

### 1. Importar o Guard no módulo

```typescript
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';

@Module({
  // ... outras configurações
  providers: [AuthGuard],
})
export class SomeModule {}
```

### 2. Aplicar o Guard em Controllers

```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';

@Controller('protected-route')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  getProtectedData() {
    return { message: 'This is protected' };
  }
}
```

### 3. Acessar dados do usuário autenticado

Use o decorator `@User()` para acessar os dados do usuário autenticado:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/src/infra/guards/auth/auth.guard';
import { User } from '@/src/infra/decorators/user.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('profile')
  getProfile(@User() userData: { user: { id: string; email: string }; token: string }) {
    return {
      userId: userData.user.id,
      email: userData.user.email,
      token: userData.token,
    };
  }
}
```

## Fluxo de Validação

1. Extrai token do header `Authorization: Bearer <token>`
2. Valida o token usando `ValidateTokenJwtService`
3. Extrai `uuid` e `email` do payload do token
4. Injeta os dados no objeto `request.user`
5. Permite acesso ao recurso protegido

## Header Esperado

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Resposta em Caso de Erro

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid or expired token"
}
```

## Estrutura de Dados Injetados

```typescript
interface AuthenticatedRequest extends Request {
  user: {
    id: string;      // uuid do usuário
    email: string;   // email do usuário
  };
  token: string;     // token completo
}
```

## Testes

Execute os testes do AuthGuard:

```bash
npm run test -- auth.guard.spec.ts
```
