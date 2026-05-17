import { EncryptedPasswordAuthService } from '@/src/modules/app/auth/application/services/encrypted-password/encrypted-password-auth.service';

export class InMemoryAuthRepository extends EncryptedPasswordAuthService {
  async hash(password: string): Promise<string> {
    return Promise.resolve(`${password}-hashed`);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return Promise.resolve(`${password}-hashed` === hash);
  }
}
