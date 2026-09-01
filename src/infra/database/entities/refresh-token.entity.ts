import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid' })
  userUuid: string;

  @Column({ type: 'text' })
  tokenHash: string;

  @Column({ type: 'timestamptz' })
  expiresAt: string;

  @Column({ type: 'boolean', default: false })
  revoked: boolean;

  @Column({ type: 'uuid', nullable: true })
  replacedBy?: string | null;

  @CreateDateColumn()
  createdAt: string;

  @Column({ type: 'timestamptz', nullable: true })
  replacedAt?: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastUsedAt?: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ip?: string;

  @Column({ type: 'text', nullable: true })
  userAgent?: string;
}
