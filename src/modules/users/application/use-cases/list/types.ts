import type { RoleEnumProps } from "@/app/core";
import type { User } from "../../entities/user/users";

export interface ListUserRequestProps {
  uuid?: string;
  name?: string;
  email?: string;
  role?: RoleEnumProps;
};

export interface ListUserResponseProps {
  total: number;
  data: User[];
}