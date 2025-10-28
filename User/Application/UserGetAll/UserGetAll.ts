import { User } from "../../Domain/User";
import { UserRepository } from "../../Domain/UserRepository";

export class UserGetAll{
    constructor(private readonly repository: UserRepository){}

    async run(): Promise <User[]>{
        return this.repository.getAllUsers()
    }
}