import { ROLE_ENUM } from '@/core';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome muito longo')
    .optional(),
  email: z.string().optional(),
  birthDate: z.string().optional(),
  phone: z.string()
    .regex(/^\d{13,14}$/, 'Telefone deve conter apenas números (13 ou 14 dígitos)')
    .optional(),
  password: z.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[\W_]/, 'Deve conter pelo menos um caractere especial (ex: @, #, $, %)')
    .optional(),
  confirmPassword: z.string().optional(),
  avatarUrl: z.string()
    .optional()
    .or(z.literal('')),
  role: z.enum([ROLE_ENUM.ADMIN, ROLE_ENUM.AGENCY, ROLE_ENUM.SELLER]).optional().default(ROLE_ENUM.SELLER),
});

class UpdateUserRequestDto extends createZodDto(updateUserSchema) {};

export { updateUserSchema, UpdateUserRequestDto };

