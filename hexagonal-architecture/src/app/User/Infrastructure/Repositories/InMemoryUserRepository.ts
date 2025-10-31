import { User } from "../../Domain/models/User";
import { UserId } from "../../Domain/models/UserId";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository{
    private users: User[] = []

    async create(user:User): Promise<void> {
        this.users.push(user)
    }

    async edit(user:User): Promise<void>{
        const index = this.users.findIndex(u => u.id.value === user.id.value)
        this.users[index] = user
    }

    async getAllUsers(): Promise<User[]> {
        return this.users
    }

    async getOneById(id: UserId): Promise<User | null> {
        return this.users.find((user) => user.id.value === id.value) || null
    }

    async delete(id: UserId): Promise<void> {
        this.users = this.users.filter((user) => user.id.value !== id.value)
    }
}