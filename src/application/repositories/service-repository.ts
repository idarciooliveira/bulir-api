import { Service } from "../entities/service";

export abstract class ServiceRepository {
    abstract save(service: Service): Promise<void>
    abstract findById(id: string): Promise<Service | null>
    abstract getAll(): Promise<Service[]>
    abstract findByUserId(userId: string): Promise<Service[]>
}