import { ROLE_ENUM } from '@/core';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome muito longo'),
  email: z.string(),
  birthDate: z.string(),
  phone: z.string()
    .regex(/^\d{13,14}$/, 'Telefone deve conter apenas números (13 ou 14 dígitos)'),
  password: z.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[\W_]/, 'Deve conter pelo menos um caractere especial (ex: @, #, $, %)'),
  confirmPassword: z.string(),
  avatarUrl: z.string()
    .optional()
    .or(z.literal('')),
  role: z.enum([ROLE_ENUM.ADMIN, ROLE_ENUM.AGENCY, ROLE_ENUM.SELLER]).default(ROLE_ENUM.SELLER),
});

class CreateUserRequestDto extends createZodDto(createUserSchema) {};

export { createUserSchema, CreateUserRequestDto };

