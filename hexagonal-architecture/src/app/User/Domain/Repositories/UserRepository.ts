import { User } from "../models/User";
import { UserId } from "../models/UserId";

export interface UserRepository{
    create(user: User): Promise<void>
    edit(user: User): Promise<void>
    getAllUsers(): Promise<User[]>
    getOneById(id: UserId): Promise<User | null>
    delete(id : UserId): Promise<void>
}