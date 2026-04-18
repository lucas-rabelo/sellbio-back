import type { User } from "../../entities/user/users";
import type { CreateUserRequestProps } from "../create/types";

export type UpdateUserRequestProps = {
  userUuid: string;
  data: Partial<CreateUserRequestProps>;
};

export interface UpdateUserResponseProps {
  user: User;
}