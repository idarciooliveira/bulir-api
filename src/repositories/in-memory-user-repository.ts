import { User } from "src/entities/user";
import { UserRepository } from "./user-repository";

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = []

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async findByNif(nif: string): Promise<boolean> {
        return this.users.some(u => u.Nif === nif)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(u => u.Email === email)
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(u => u.Id === id)
    }

    async getAll(): Promise<User[]> {
        return this.users
    }

}