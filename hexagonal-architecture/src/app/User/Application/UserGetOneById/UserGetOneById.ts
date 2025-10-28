import { User } from "../../Domain/models/User";
import { UserId } from "../../Domain/models/UserId";
import { UserNotFoundError } from "../../Domain/Exceptions/UserNotFoundError";
import { UserRepository } from "../../Domain/Repositories/UserRepository";

export class UserGetOneById{
    constructor(private repository: UserRepository){}

    async run(id:string): Promise<User>{
       const user = await this.repository.getOneById(new UserId(id));

       if(!user) throw new UserNotFoundError('User not found');

       return user;
    }
}