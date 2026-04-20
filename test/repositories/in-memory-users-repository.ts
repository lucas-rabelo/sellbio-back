import type { User } from '@/app/modules/users/application/entities/user/users';
import type { ListUserRequestProps, ListUserResponseProps } from '@/app/modules/users/application/use-cases/list/types';
import type { UsersRepository } from "@/app/modules/users/infra/http/database/users.repository";

export class InMemoryUserRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (item) => item.email === email && !item.deletedAt
    )

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUuid(uuid: string): Promise<User | null> {
    const user = this.users.find(
      (item) => item.uuid === uuid && !item.deletedAt
    )

    if (!user) {
      return null;
    }

    return user;
  }

  async list(filters: ListUserRequestProps): Promise<ListUserResponseProps> {
    const { uuid, name, email, role } = filters;

    const total = this.users.filter(
      user =>
        (name && user.name.includes(name)) ||
        (email && user.email.includes(email)) ||
        (uuid && user.uuid === uuid) ||
        (role && user.role === role)
    ).length;

    const users = this.users.filter(
      user =>
        (name && user.name.includes(name)) ||
        (email && user.email.includes(email)) ||
        (uuid && user.uuid === uuid) ||
        (role && user.role === role)
    );

    return {
      total,
      data: users.map(user => ({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate.toISOString(),
        phone: user.phone,
        avatarUrl: user.avatarUrl ?? '',
        isActived: user.isActived,
        role: user.role,
      })),
    };
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (item) => item.uuid === user.uuid
    )

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }
}