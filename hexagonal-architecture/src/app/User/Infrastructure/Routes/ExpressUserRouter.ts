import { Router } from "express";
import { ServiceContainer } from "../../../Shared/Infrastructure/ServiceContainer";
import { ExpressUserController } from "../Controllers/ExpressUserController";

const controller = new ExpressUserController()
const ExpressUserRouter = Router()

ExpressUserRouter.get('/user/', controller.getAll)
ExpressUserRouter.get('/user/:id/', controller.getOneById)
ExpressUserRouter.post('/user/', controller.create)
ExpressUserRouter.put('/user/', controller.edit)
ExpressUserRouter.delete('/user/:id', controller.delete)

export { ExpressUserRouter }