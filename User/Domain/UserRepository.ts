import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository{
    create(user: User): Promise<void>
    edit(user: User): Promise<void>
    getAllUsers(): Promise<User[]>
    getOneById(id: UserId): Promise<User>
    delete(id : UserId): Promise<void>
}