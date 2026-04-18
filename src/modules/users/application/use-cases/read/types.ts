import type { User } from "../../entities/user/users";

export interface ReadUserRequestProps {
  userUuid: string;
};

export interface ReadUserResponseProps {
  user: User;
}