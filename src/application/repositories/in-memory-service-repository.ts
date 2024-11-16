import { Service } from "../entities/service";
import { ServiceRepository } from "./service-repository";

export class InMemoryServiceRepository implements ServiceRepository {
    

    public services: Service[] = []

    async update(service: Service): Promise<void> {
        const index = this.services.findIndex(service => service.Id == service.Id)
        if (index >= 0) this.services[index] = service
    }


    async getAll(): Promise<Service[]> {
        return this.services
    }

    async findByUserId(userId: string): Promise<Service[]> {
        return this.services.filter(u => u.UserId === userId)
    }

    async findById(id: string): Promise<Service | null> {
        return this.services.find(u => u.Id === id)
    }

    async save(service: Service): Promise<void> {
        this.services.push(service)
    }
}