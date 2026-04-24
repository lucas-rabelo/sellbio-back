import { ROLE_ENUM } from '@/app/core';
import { UsersEntity as TypeOrmUser, type UsersEntity } from '@/app/infra/database/entities/users.entity';
import { Password } from '@/app/modules/app/users/application/entities/password/password';
import { User as DomainUser } from '@/app/modules/app/users/application/entities/user/users';

export class UserMapper {
  static toTypeOrm(domainUser: DomainUser): TypeOrmUser {
    const typeOrmUser = new TypeOrmUser();

    typeOrmUser.uuid = domainUser.uuid;
    typeOrmUser.name = domainUser.name;
    typeOrmUser.email = domainUser.email;
    typeOrmUser.passwordHash = domainUser.passwordHash.value;
    typeOrmUser.phone = domainUser.phone;
    typeOrmUser.birthDate = new Date(domainUser.birthDate).toISOString();
    typeOrmUser.avatarUrl = domainUser.avatarUrl ?? '';
    typeOrmUser.role = domainUser.role;
    typeOrmUser.isActived = domainUser.isActived;
    typeOrmUser.createdAt = new Date(domainUser.createdAt).toISOString();
    typeOrmUser.updatedAt = domainUser.updatedAt ? new Date(domainUser.updatedAt).toISOString() : undefined;
    typeOrmUser.deletedAt = domainUser.deletedAt ? new Date(domainUser.deletedAt).toISOString() : undefined;

    return typeOrmUser;
  }

  static toDomain(typeOrmUser: TypeOrmUser): DomainUser {
    return new DomainUser(
      {
        name: typeOrmUser.name,
        email: typeOrmUser.email,
        phone: typeOrmUser.phone,
        birthDate: new Date(typeOrmUser.birthDate),
        passwordHash: Password.use(typeOrmUser.passwordHash),
        avatarUrl: typeOrmUser.avatarUrl ?? '',
        role: ROLE_ENUM[typeOrmUser.role.toUpperCase()],
        isActived: typeOrmUser.isActived,
        createdAt: new Date(typeOrmUser.createdAt),
        updatedAt: typeOrmUser.updatedAt ? new Date(typeOrmUser.updatedAt) : null,
        deletedAt: typeOrmUser.deletedAt ? new Date(typeOrmUser.deletedAt) : null,
      },
      typeOrmUser.uuid,
    );
  }

static toDTO(user: UsersEntity) {
    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      birthDate: new Date(user.birthDate).toISOString(), 
      phone: user.phone,
      isActived: user.isActived,
      role: user.role,
      avatarUrl: user.avatarUrl,
      createdAt: new Date(user.createdAt).toISOString(),
      updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : null,
    };
  }
}