import type { RoleEnumProps } from "@/app/core";
import type { Password } from "../password/password";

export interface UserProps {
  name: string;
  email: string;
  birthDate: Date;
  phone: string;
  passwordHash: Password;
  avatarUrl?: string | null;
  role: RoleEnumProps;
  isActived: boolean;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
export interface UserReplaceProps {
  createdAt?: Date;
  isActived?: boolean;
  refreshToken?: string | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  avatarUrl?: string | null;
}