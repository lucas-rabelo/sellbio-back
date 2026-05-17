import type z from 'zod';
import type { deleteUserSchema } from '../../../dtos/delete-user.dto';

export type DeleteUserRequestProps = z.infer<typeof deleteUserSchema>;

export type DeleteUserResponseProps = void;
