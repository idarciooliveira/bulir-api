

import { Injectable } from "@nestjs/common"
import { NotFoundError } from "src/application/errors/error"
import { ServiceRepository } from "src/application/repositories/service-repository"

@Injectable()
export class GetServiceById {
    constructor(private serviceRepo: ServiceRepository) { }

    async execute(id: string) {
        const service = await this.serviceRepo.findById(id)
        if (!service) throw new NotFoundError('Service')
        return service
    }
}