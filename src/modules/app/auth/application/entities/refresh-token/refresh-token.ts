import type { Replace } from '@/src/core/helpers/Replace';
import type { RefreshTokenProps, RefreshTokenReplaceProps } from './types';
import { randomUUID } from 'crypto';

export class RefreshToken {
  private _uuid: string;
  private props: RefreshTokenProps;

  private constructor(
    props: Replace<RefreshTokenProps, RefreshTokenReplaceProps>,
    uuid?: string,
  ) {
    this._uuid = uuid ?? randomUUID();
    this.props = {
      ...props,
      revoked: false,
      replacedAt:
        props.replacedAt instanceof Date
          ? props.replacedAt
          : props.replacedAt
            ? new Date(props.replacedAt)
            : null,
      createdAt:
        props.createdAt instanceof Date
          ? props.createdAt
          : props.createdAt
            ? new Date(props.createdAt)
            : new Date(),
      lastUsedAt:
        props.lastUsedAt instanceof Date
          ? props.lastUsedAt
          : props.lastUsedAt
            ? new Date(props.lastUsedAt)
            : null,
    };
  }

  public static create(props: RefreshTokenProps): RefreshToken {
    return new RefreshToken(props);
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get userUuid(): string {
    return this.props.userUuid;
  }

  public get tokenHash(): string {
    return this.props.tokenHash;
  }

  public get expiresAt(): Date {
    return this.props.expiresAt;
  }

  public get revoked(): boolean {
    return !!this.props.revoked;
  }

  public set revoked(value: boolean) {
    this.props.revoked = value;
  }

  public get replacedBy(): string | null | undefined {
    return this.props.replacedBy;
  }

  public set replacedBy(value: string | null | undefined) {
    this.props.replacedBy = value ?? null;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public get replacedAt(): Date | null | undefined {
    return this.props.replacedAt;
  }

  public get lastUsedAt(): Date | null | undefined {
    return this.props.lastUsedAt;
  }

  public set lastUsedAt(value: Date | null | undefined) {
    this.props.lastUsedAt = value ?? null;
  }

  public get ip(): string | null | undefined {
    return this.props.ip;
  }

  public get userAgent(): string | null | undefined {
    return this.props.userAgent;
  }

  public toJSON() {
    return { ...this.props };
  }
}
