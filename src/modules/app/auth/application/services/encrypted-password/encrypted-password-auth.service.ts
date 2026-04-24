import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptedPasswordAuthService {
  private readonly saltRounds = 12;

  async execute(password: string): Promise<string> {
    const passwordEncrypted = await bcrypt.hash(password, this.saltRounds);

    return passwordEncrypted;
  }
}