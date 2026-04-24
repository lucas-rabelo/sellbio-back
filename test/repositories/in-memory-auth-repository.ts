import { EncryptedPasswordAuthService } from "@/app/modules/app/auth/application/services/encrypted-password/encrypted-password-auth.service";

export class InMemoryAuthRepository extends EncryptedPasswordAuthService {
  async hash(password: string): Promise<string> {
    return `${password}-hashed`;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return `${password}-hashed` === hash;
  }
}