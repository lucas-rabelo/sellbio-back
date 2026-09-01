import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserRequestSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome muito longo'),
  email: z.email('E-mail inválido'),
  birthDate: z.string(),
  phone: z
    .string()
    .regex(
      /^\d{12,13}$/,
      'Telefone deve conter apenas números (12 ou 13 dígitos)',
    ),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(
      /[\W_]/,
      'Deve conter pelo menos um caractere especial (ex: @, #, $, %)',
    ),
  confirmPassword: z.string(),
  avatarUrl: z.string().optional().or(z.literal('')),
  isActived: z.boolean().default(true),
  role: z.enum(['ADMIN', 'AGENCY', 'SELLER']).default('SELLER'),
  refreshToken: z.string().optional(),
});

class CreateUserRequestDto extends createZodDto(createUserRequestSchema) {}

export { CreateUserRequestDto, createUserRequestSchema };
