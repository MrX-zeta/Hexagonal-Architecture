import { Router, Request, Response, NextFunction } from 'express';
import { ServiceContainer } from '../../hexagonal-architecture/src/app/Shared/Infrastructure/ServiceContainer';
import { UserNotFoundError } from '../../hexagonal-architecture/src/app/User/Domain/Exceptions/UserNotFoundError';

const ExpressUserRouter = Router();

// GET /users - Obtener todos los usuarios
ExpressUserRouter.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await ServiceContainer.user.getAll.run();
    const usersDTO = users.map(user => user.mapToPrimitives());
    return res.status(200).json(usersDTO);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// GET /users/:id - Obtener un usuario por ID
ExpressUserRouter.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await ServiceContainer.user.getObeById.run(req.params.id!);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

// POST /users - Crear un usuario
ExpressUserRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, email, createdAt } = req.body as {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };

  try {
    await ServiceContainer.user.create.run(
      id,
      name,
      email,
      new Date(createdAt)
    );
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    return res.status(400).json({ message: 'Validation error', error: (error as Error).message });
  }
});

// PUT /users/:id - Actualizar un usuario
ExpressUserRouter.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, createdAt } = req.body as {
    name: string;
    email: string;
    createdAt: string;
  };

  try {
    await ServiceContainer.user.edit.run(
      req.params.id!,
      name,
      email,
      new Date(createdAt)
    );
    return res.status(200).json({ message: 'User updated' });
  } catch (error) {
    return res.status(400).json({ message: 'Validation error', error: (error as Error).message });
  }
});

// DELETE /users/:id - Eliminar un usuario
ExpressUserRouter.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ServiceContainer.user.delete.run(req.params.id!);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
});

export { ExpressUserRouter };
