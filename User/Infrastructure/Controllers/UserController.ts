import { Request, Response } from "express";
import { UserGetAll } from "../../Application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../Application/UserGetOneById/UserGetOneById";

export class UserController{
    constructor(private userGetAll: UserGetAll, private userGetOneById: UserGetOneById){}

    async getAll(requ: Request, resp: Response){
        try{
            const users = await this.userGetAll.run()
            resp.json(users)
        }catch(error){
            resp.status(500).json({message: 'Internal Server Error'})
        }
    }

    async getOne(req: Request, resp: Response){
        try{
            const user = await this.userGetOneById.run(req.params.id)
            resp.json(user)
        }catch(error){
            resp.status(500).json({message: 'Internal Server Error'})
        }
    }
}