import { Injectable } from "@nestjs/common"
import { ServiceRepository } from "src/application/repositories/service-repository"

@Injectable()
export class GetServicesByUserId {
    constructor(private serviceRepo: ServiceRepository) { }

    async execute(userId: string) {
        return await this.serviceRepo.findByUserId(userId)
    }
}