import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'date',
    nullable: false,
    unique: false,
  })
  birthDate: string;

  @Column({
    type: 'varchar',
    length: 14,
    nullable: false,
    unique: false,
  })
  phone: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: false,
  })
  passwordHash: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: false,
  })
  avatarUrl?: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: false,
    nullable: false,
  })
  role: string;

  @Column({
    type: 'boolean',
    nullable: false,
    unique: false,
    default: false,
  })
  isActived: boolean;

  @Column({
    type: 'text',
    nullable: true,
    unique: true,
    default: null,
  })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt?: string;

  @DeleteDateColumn({ nullable: true, default: null })
  deletedAt?: string;
}
