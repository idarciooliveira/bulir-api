import { Injectable } from "@nestjs/common"
import { ServiceRepository } from "src/application/repositories/service-repository"

@Injectable()
export class GetAllService {
    constructor(private serviceRepo: ServiceRepository) { }

    async execute() {
        return await this.serviceRepo.getAll()
    }
}