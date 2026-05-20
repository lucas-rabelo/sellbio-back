import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptedBcryptService {
  private readonly saltRounds = 12;

  async execute(password: string): Promise<string> {
    const encrypted = await bcrypt.hash(password, this.saltRounds);

    return encrypted;
  }
}
