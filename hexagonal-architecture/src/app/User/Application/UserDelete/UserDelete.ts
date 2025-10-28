import { UserId } from "../../Domain/models/UserId";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class UserDelete{
    constructor(private repository: UserRepository){}

    async run(id:string): Promise<void>{
        await this.repository.delete(new UserId(id))
    }
}