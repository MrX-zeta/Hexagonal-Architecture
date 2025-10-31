import { Request, Response } from "express";
import { UserGetAll } from "../../Application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../Application/UserGetOneById/UserGetOneById";
import { ServiceContainer } from "../../../Shared/Infrastructure/ServiceContainer";
import { UserNotFoundError } from "../../Domain/Exceptions/UserNotFoundError";

export class UserController{

    async getAll(requ: Request, resp: Response){
        const users = await ServiceContainer.user.getAll.run()

        return resp.json(users).status(200)
    }

    async getOneById(req: Request, resp: Response){
        try{
            const user = await ServiceContainer.user.getObeById.run(req.params['id'])
            return resp.json(user).status(200)
        }catch(error){
            if(error instanceof UserNotFoundError){
                return resp.status(404).json({ message: error.message })
            }
            throw error
        }
    }

    async create(
        req: Request, resp: Response){
        const {createdAt, email, id, name} = req.body as {
            id: string,
            name: string,
            email: string,
            createdAt: string
        }
        try{
            await ServiceContainer.user.create.run(
                id,
                name,
                email,
                new Date(createdAt)
            )
            return resp.status(201).json({ message: 'User created' })
        }catch(error){
            return resp.status(500).json({ message: 'Internal server error' })
        }
    }

    async edit(req: Request, resp: Response){
        const {createdAt, email, id, name} = req.body as {
            id: string,
            name: string,
            email: string,
            createdAt: string
        }
        try{
            await ServiceContainer.user.edit.run(id,name,email,new Date(createdAt))
            return resp.status(204).json({ message: 'User created' })
        }catch(error){
            return resp.status(500).json({ message: 'Internal server error' })
        }
    }

    async delete(req: Request, resp: Response){
        try{
            const user = await ServiceContainer.user.delete.run(req.params['id'])
            return resp.status(204).json()
        }catch(error){
            return resp.status(500).json({ message: 'Internal server error' })
        }
    }
}