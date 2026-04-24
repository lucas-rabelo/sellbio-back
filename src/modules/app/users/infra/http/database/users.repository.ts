import type { User } from "@/modules/app/users/application/entities/user/users";
import type { ListUserRequestProps, ListUserResponseProps } from "../../../application/use-cases/list/types";

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByUuid(uuid: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract list(filters: ListUserRequestProps): Promise<ListUserResponseProps>;
  abstract save(user: User): Promise<void>;
}