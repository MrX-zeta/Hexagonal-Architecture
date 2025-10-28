import { User } from "../../Domain/models/User";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class UserGetAll{
    constructor(private readonly repository: UserRepository){}

    async run(): Promise <User[]>{
        return this.repository.getAllUsers()
    }
}