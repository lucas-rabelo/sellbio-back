import { makeUser } from "@/test/factories/user-factory";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { DeleteUserUseCase } from "./delete-user.use-case";
import { NotFoundException } from "@/core/exceptions/not-found.exception";
import { CONTEXT_USER } from "../../constants/contexts";

describe("Delete user", () => {
  it("should be able delete user", async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteUser = new DeleteUserUseCase(userRepository);

    const user = await makeUser(CONTEXT_USER.CREATE);
    await userRepository.create(user);
    await deleteUser.execute(user.uuid);

    expect(userRepository.users[0].deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete user", async () => {
    const userRepository = new InMemoryUserRepository();
    const deleteUser = new DeleteUserUseCase(userRepository);

    expect(() => {
      return deleteUser.execute('fake-user-uuid');
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.DELETE));
  });
})