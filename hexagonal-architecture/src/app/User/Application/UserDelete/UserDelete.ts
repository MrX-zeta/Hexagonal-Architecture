import { UserNotFoundError } from "../../Domain/Exceptions/UserNotFoundError";
import { UserId } from "../../Domain/models/UserId";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class UserDelete{
    constructor(private repository: UserRepository){}

    async run(id:string): Promise<void>{
        const userId = new UserId(id)
        const userExists = await this.repository.getOneById(userId)

        if(!userExists){
            throw new UserNotFoundError('User not found')
        }
        await this.repository.delete(userId)
    }
}