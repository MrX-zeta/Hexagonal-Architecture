import { User } from "../../Domain/models/User";
import { UserCreatedAt } from "../../Domain/models/UserCreatedAt";
import { UserEmail } from "../../Domain/models/UserEmail";
import { UserId } from "../../Domain/models/UserId";
import { UserName } from "../../Domain/models/UserName";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class UserCreate{
    constructor(private repository: UserRepository){}

    async run(
        id:string,
        name:string,
        email:string,
        createdAt:Date
    ):Promise<void>{
        const user = new User(
            new UserId(id), 
            new UserName(name), 
            new UserEmail(email), 
            new UserCreatedAt(createdAt)
        )
        return this.repository.create(user)
    }
}