import type { RoleEnumProps } from "@/app/core";
import type { User } from "../../entities/user/users";

export interface CreateUserRequestProps {
  name: string;
  email: string;
  birthDate: Date;
  phone: string;
  password: string;
  confirmPassword: string;
  avatarUrl?: string | null;
  role: RoleEnumProps;
  isActived: boolean;
};

export interface CreateUserResponseProps {
  user: User;
}