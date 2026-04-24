import type { RoleEnumProps } from "@/app/core";
import type { Replace } from "@/app/core/helpers/Replace";
import { randomUUID } from "crypto";
import { Password } from "../password/password";
import type { UserProps, UserReplaceProps } from "./types";

export class User {
  private _uuid: string;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, UserReplaceProps>,
    uuid?: string
  ) {
    this._uuid = uuid ?? randomUUID();
    this.props = {
      ...props,
      isActived: props.isActived ?? true,
      avatarUrl: props.avatarUrl ?? null,
      refreshToken: props.refreshToken ?? null,
      createdAt: props.createdAt instanceof Date ? props.createdAt : (props.createdAt ? new Date(props.createdAt) : new Date()),
      updatedAt: props.updatedAt instanceof Date ? props.updatedAt : (props.updatedAt ? new Date(props.updatedAt) : null),
      deletedAt: props.deletedAt instanceof Date ? props.deletedAt : (props.deletedAt ? new Date(props.deletedAt) : null),
    };
  }

  public get uuid() {
    return this._uuid;
  }

  public set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  public get email(): string {
    return this.props.email;
  }

  public set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
    this.touch();
  }

  public get birthDate(): Date | string {
    return this.props.birthDate;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
    this.touch();
  }

  public get phone(): string {
    return this.props.phone;
  }

  public set passwordHash(passwordHash: Password) {
    this.props.passwordHash = passwordHash;
    this.touch();
  }

  public get passwordHash(): Password {
    return this.props.passwordHash;
  }

  public set avatarUrl(avatarUrl: string | null | undefined) {
    this.props.avatarUrl = avatarUrl;
    this.touch();
  }

  public get avatarUrl(): string | null | undefined {
    return this.props.avatarUrl;
  }

  public set role(role: RoleEnumProps) {
    this.props.role = role;
    this.touch();
  }

  public get role(): RoleEnumProps {
    return this.props.role;
  }

  public activate() {
    this.props.isActived = true;
    this.touch();
  }

  public deactivate() {
    this.props.isActived = false;
    this.touch();
  }

  public get isActived(): boolean {
    return this.props.isActived;
  }

  public set refreshToken(refreshToken: string | null | undefined) {
    this.props.refreshToken = refreshToken;
    this.touch();
  }

  public get refreshToken(): string | null | undefined {
    return this.props.refreshToken;
  }

  public get createdAt(): Date | string {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | string | null {
    return this.props.updatedAt ? this.props.updatedAt : null;
  }

  public delete() {
    this.props.deletedAt = new Date();
  }

  public get deletedAt(): Date | string | null {
    return this.props.deletedAt ? this.props.deletedAt : null;
  }

  public touch() {
    this.props.updatedAt = new Date();
  }
}