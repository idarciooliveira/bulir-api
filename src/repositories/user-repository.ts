import { User } from "src/entities/user";


export abstract class UserRepository {
    abstract save(user: User): Promise<void>
    abstract findByNif(nif: string): Promise<boolean>
    abstract findByEmail(email: string): Promise<User>
    abstract findById(id: string): Promise<User | null>
    abstract getAll(): Promise<User[]>
}