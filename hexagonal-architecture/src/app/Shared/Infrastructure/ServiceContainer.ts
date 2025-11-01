import { UserCreate } from "../../User/Application/UserCreate/UserCreate"
import { UserDelete } from "../../User/Application/UserDelete/UserDelete"
import { UserEdit } from "../../User/Application/UserEdit/UserEdit"
import { UserGetAll } from "../../User/Application/UserGetAll/UserGetAll"
import { UserGetOneById } from "../../User/Application/UserGetOneById/UserGetOneById"
import { PostgresUserRepository } from "../../User/Infrastructure/Repositories/PostgresUserRepository"

// Leer la URL de conexión desde las variables de entorno
const DATABASE_URL = process.env['DATABASE_URL'] || 'postgresql://postgres:password@localhost:5432/Hexagonal-Arch'

const UserRepository = new PostgresUserRepository(DATABASE_URL)

export const ServiceContainer = {
    user: {
        create: new UserCreate(UserRepository),
        getAll: new UserGetAll(UserRepository),
        edit: new UserEdit(UserRepository),
        getObeById: new UserGetOneById(UserRepository),
        delete: new UserDelete(UserRepository)
    }
}