import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { ListUserUseCase } from "./list-user.use-case";
import { makeUser } from "@/test/factories/user-factory";

describe("List user", () => {
  it("should be able to list user", async () => {
    const userRepository = new InMemoryUserRepository();
    const listUser = new ListUserUseCase(userRepository);

    await userRepository.create(makeUser({
      name: 'Teste 1',
      email: 'teste.1@email.com'
    }));
    await userRepository.create(makeUser({
      name: 'Teste 2',
      email: 'teste.2@email.com'
    }));
    await userRepository.create(makeUser({
      name: 'Teste 3',
      email: 'teste.3@email.com'
    }));
    await userRepository.create(makeUser({
      name: 'Teste 4',
      email: 'teste.4@email.com'
    }));

    const { total, data } = await listUser.execute({
      name: 'Teste',
    });

    expect(data).toHaveLength(4);
    expect(total).toEqual(4);
    expect(data).toEqual(expect.arrayContaining([
      expect.objectContaining({ email: 'teste.1@email.com' }),
      expect.objectContaining({ email: 'teste.2@email.com' }),
      expect.objectContaining({ email: 'teste.3@email.com' }),
      expect.objectContaining({ email: 'teste.4@email.com' }),
    ]));
  });
})