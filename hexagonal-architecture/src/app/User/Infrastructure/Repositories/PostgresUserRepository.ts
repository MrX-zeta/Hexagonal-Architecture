import { Pool } from "pg";
import { User } from "../../Domain/models/User";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { UserCreatedAt } from "../../Domain/models/UserCreatedAt";
import { UserId } from "../../Domain/models/UserId";
import { UserName } from "../../Domain/models/UserName";
import { UserEmail } from "../../Domain/models/UserEmail";

type PostgresUser ={
    id: string,
    name: string,
    email: string,
    createdAt: Date
}

export class PostgresUserRepository implements UserRepository{
    client: Pool

    constructor(databaseUrl:string){
        this.client = new Pool({
            connectionString: databaseUrl
        })
    }

    async create(user: User): Promise<void> {
        const query = 'INSERT INTO users(id, name, email) VALUES($1, $2, $3)'
        const values = [user.id.value, user.name.value, user.email.value]

        await this.client.query(query, values)
    }

    async edit(user: User): Promise<void> {
        const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3'
        const values = [user.name.value, user.email.value, user.id.value]

        await this.client.query(query, values)
    }

    async getAllUsers(): Promise<User[]> { 
        const query = { 
            text: 'SELECT * FROM users' 
        }
        const result = await this.client.query<PostgresUser>(query)
        return result.rows.map(
            (row) => this.mapToDomain(row)
        )
    }

    async getOneById(id: UserId): Promise<User | null> {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id.value]
        }

        const result = await this.client.query<PostgresUser>(query)
        
        if (result.rows.length === 0) {
            return null
        }

        const row = result.rows[0]

        return this.mapToDomain(row)
    }

    async delete(id: UserId): Promise<void> {
        const query = 'DELETE FROM users WHERE id = $1'
        const values = [id.value]

        await this.client.query(query, values)
    }

    private mapToDomain(user : PostgresUser): User{
        return new User(
            new UserId(user.id),
            new UserName(user.name),
            new UserEmail(user.email),
            new UserCreatedAt(user.createdAt)
        )
    }
}