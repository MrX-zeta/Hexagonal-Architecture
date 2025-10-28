import { UserId } from "../../Domain/UserId";
import { UserRepository } from "../../Domain/UserRepository";

export class UserDelete{
    constructor(private repository: UserRepository){}

    async run(id:string): Promise<void>{
        await this.repository.delete(new UserId(id))
    }
}