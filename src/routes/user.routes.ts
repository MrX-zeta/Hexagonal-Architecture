import { Router } from 'express';

const ExpressUserRouter = Router();

// Rutas temporales - puedes conectarlas después con tu lógica
ExpressUserRouter.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

ExpressUserRouter.get('/users/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

ExpressUserRouter.post('/', (req, res) => {
  res.status(201).json({ message: 'User created', body: req.body });
});

ExpressUserRouter.put('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated`, body: req.body });
});

ExpressUserRouter.delete('/:id', (req, res) => {
  res.status(204).send();
});

export { ExpressUserRouter };
