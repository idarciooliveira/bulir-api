import { Service } from "../entities/service";

export abstract class ServiceRepository {
    abstract save(service: Service): Promise<void>
    abstract getAll(): Promise<Service[]>
    abstract findByUserId(userId: string): Promise<Service[]>
}