import { UserCreate } from "../../hexagonal-architecture/src/app/User/Application/UserCreate/UserCreate";
import { UserGetAll } from "../../hexagonal-architecture/src/app/User/Application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../hexagonal-architecture/src/app/User/Application/UserGetOneById/UserGetOneById";
import { InMemoryUserRepository } from "../../hexagonal-architecture/src/app/User/Infrastructure/Repositories/InMemoryUserRepository";

const UserRepository = new InMemoryUserRepository();

export const ServiceContainer = {
  user: {
    create: new UserCreate(UserRepository),
    getAll: new UserGetAll(UserRepository),
    getOneById: new UserGetOneById(UserRepository)
  }
};
