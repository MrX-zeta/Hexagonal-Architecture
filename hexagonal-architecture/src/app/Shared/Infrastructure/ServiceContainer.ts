import { UserCreate } from "../../User/Application/UserCreate/UserCreate"
import { UserDelete } from "../../User/Application/UserDelete/UserDelete"
import { UserEdit } from "../../User/Application/UserEdit/UserEdit"
import { UserGetAll } from "../../User/Application/UserGetAll/UserGetAll"
import { UserGetOneById } from "../../User/Application/UserGetOneById/UserGetOneById"
import { InMemoryUserRepository } from "../../User/Infrastructure/Repositories/InMemoryUserRepository"

const UserRepository = new InMemoryUserRepository()

//In case of using Postgres:
// const UserRepository = new PostgresUserRepository('url')

export const ServiceContainer = {
    user: {
        create: new UserCreate(UserRepository),
        getAll: new UserGetAll(UserRepository),
        edit: new UserEdit(UserRepository),
        getObeById: new UserGetOneById(UserRepository),
        delete: new UserDelete(UserRepository)
    }
}