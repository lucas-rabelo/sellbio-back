import { ROLE_ENUM } from '@/app/core';
import { UsersEntity as TypeOrmUser } from '@/app/infra/database/entities/users.entity';
import { Password } from '@/app/modules/users/application/entities/password/password';
import { User as DomainUser } from '@/app/modules/users/application/entities/user/users';

export class UserMapper {
  static toTypeOrm(domainUser: DomainUser): TypeOrmUser {
    const typeOrmUser = new TypeOrmUser();

    typeOrmUser.uuid = domainUser.uuid;
    typeOrmUser.name = domainUser.name;
    typeOrmUser.email = domainUser.email;
    typeOrmUser.passwordHash = domainUser.passwordHash.value;
    typeOrmUser.phone = domainUser.phone;
    typeOrmUser.birthDate = domainUser.birthDate.toISOString();
    typeOrmUser.avatarUrl = domainUser.avatarUrl ?? '';
    typeOrmUser.role = domainUser.role;
    typeOrmUser.isActived = domainUser.isActived;
    typeOrmUser.createdAt = domainUser.createdAt.toISOString();
    typeOrmUser.updatedAt = domainUser.updatedAt ? domainUser.updatedAt.toISOString() : '';
    typeOrmUser.deletedAt = domainUser.deletedAt ? domainUser.deletedAt.toISOString() : '';

    return typeOrmUser;
  }

  static toDomain(typeOrmUser: TypeOrmUser): DomainUser {
    return new DomainUser(
      {
        name: typeOrmUser.name,
        email: typeOrmUser.email,
        phone: typeOrmUser.phone,
        birthDate: new Date(typeOrmUser.birthDate),
        passwordHash: Password.restore(typeOrmUser.passwordHash),
        avatarUrl: typeOrmUser.avatarUrl,
        role: ROLE_ENUM[typeOrmUser.role],
        isActived: typeOrmUser.isActived,
        createdAt: new Date(typeOrmUser.createdAt),
        updatedAt: typeOrmUser.updatedAt ? new Date(typeOrmUser.updatedAt) : null,
        deletedAt: typeOrmUser.deletedAt ? new Date(typeOrmUser.deletedAt) : null,
      },
      typeOrmUser.uuid,
    );
  }
}