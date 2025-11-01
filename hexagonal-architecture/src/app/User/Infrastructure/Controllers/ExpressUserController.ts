import { NextFunction, Request, Response } from "express";
import { UserGetAll } from "../../Application/UserGetAll/UserGetAll";
import { UserGetOneById } from "../../Application/UserGetOneById/UserGetOneById";
import { ServiceContainer } from "../../../Shared/Infrastructure/ServiceContainer";
import { UserNotFoundError } from "../../Domain/Exceptions/UserNotFoundError";

export class ExpressUserController{

    async getAll(req: Request, resp: Response, next: NextFunction){
        try{
            const users = await ServiceContainer.user.getAll.run()

            return resp.json(users.map((user)=> user.mapToPrimitives())).status(200)
        }catch(error){
            next(error)
        }
    }

    async getOneById(req: Request, resp: Response, next: NextFunction){
        try{
            const user = await ServiceContainer.user.getObeById.run(req.params['id'])
            
            return resp.json(user.mapToPrimitives()).status(200)
        }catch(error){
            if(error instanceof UserNotFoundError){
                return resp.status(404).json({ message: error.message })
            }
            next(error)
        }
    }

    async create(
        req: Request, resp: Response, next: NextFunction){
        try{
            const {createdAt, email, id, name} = req.body as {
            id: string,
            name: string,
            email: string,
            createdAt: string
            }
            await ServiceContainer.user.create.run(
                id,
                name,
                email,
                new Date(createdAt)
            )
            return resp.status(201).json({ message: 'User created' })
        }catch(error){
            next(error)
        }
    }

    async edit(req: Request, resp: Response, next: NextFunction){
        try{
            const {createdAt, email, id, name} = req.body as {
            id: string,
            name: string,
            email: string,
            createdAt: string
        }
            await ServiceContainer.user.edit.run(id,name,email,new Date(createdAt))
            return resp.status(204).json({ message: 'User created' })
        }catch(error){
            if(error instanceof UserNotFoundError){
                return resp.status(404).json({ message: error.message })
            }
            next(error)
        }
    }

    async delete(req: Request, resp: Response, next: NextFunction){
        try{
            const user = await ServiceContainer.user.delete.run(req.params['id'])
            return resp.status(204).json()
        }catch(error){
            if(error instanceof UserNotFoundError){
                return resp.status(404).json({ message: error.message })
            }
            next(error)
        }
    }
}