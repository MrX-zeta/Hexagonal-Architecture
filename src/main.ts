import 'dotenv/config';
import express, { Response, Request, NextFunction } from 'express';
import { ExpressUserRouter } from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(ExpressUserRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof Error){
        console.error(err.stack);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    console.log(err)
    return res.status(500).json('Something was wrong');
})

app.get('/', (req, res) => {
  res.json({ message: 'Hexagonal Architecture API' });
})

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${process.env['DATABASE_URL'] ? 'PostgreSQL' : 'In-Memory'}`);
})
