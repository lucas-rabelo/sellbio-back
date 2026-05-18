export type RefreshTokenProps = {
  uuid: string;
  userUuid: string;
  tokenHash: string;
  expiresAt: Date;
  revoked?: boolean;
  replacedBy?: string | null;
  replacedAt?: Date;
  createdAt?: Date;
  lastUsedAt?: Date | null;
  ip?: string | null;
  userAgent?: string | null;
};

export class RefreshToken {
  private props: RefreshTokenProps;

  private constructor(props: RefreshTokenProps) {
    this.props = {
      revoked: false,
      replacedBy: null,
      ...props,
    } as RefreshTokenProps;
  }

  public static create(props: RefreshTokenProps): RefreshToken {
    return new RefreshToken(props);
  }

  public get uuid(): string {
    return this.props.uuid;
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
