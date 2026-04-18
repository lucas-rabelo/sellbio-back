import { InMemoryUserRepository } from "@/test/repositories/in-memory-users-repository";
import { UpdateUserUseCase } from "./update-user.use-case";
import { makeUser } from "@/test/factories/user-factory";
import { NotFoundException } from "@/app/core/exceptions/not-found.exception";
import { CONTEXT_USER } from "../../constants/contexts";

describe("Update user", () => {
  it("should be able update user", async () => {
    const userRespository = new InMemoryUserRepository();
    const updateUser = new UpdateUserUseCase(userRespository);

    const userMaked = makeUser();
    await userRespository.create(userMaked);

    const request = {
      ...userMaked,
      name: 'Emainara Cordeiro',
    };

    const { user } = await updateUser.execute({ userUuid: userMaked.uuid, data: request });

    expect(userRespository.users[0]).toEqual(user);
  });

  it("should not be able to update user", async () => {
    const userRespository = new InMemoryUserRepository();
    const updateUser = new UpdateUserUseCase(userRespository);

    const userMaked = makeUser();
    await userRespository.create(userMaked);

    const request = {
      ...userMaked,
      name: 'Emainara Cordeiro',
    };

    expect(() => {
      return updateUser.execute({
        userUuid: 'fake-user-uuid',
        data: request,
      });
    }).rejects.toThrow(new NotFoundException(CONTEXT_USER.UPDATE));
  });
});