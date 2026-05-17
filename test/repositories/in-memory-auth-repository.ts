export class InMemoryAuthRepository {
  async hash(password: string): Promise<string> {
    return Promise.resolve(`${password}-hashed`);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return Promise.resolve(`${password}-hashed` === hash);
  }
}
