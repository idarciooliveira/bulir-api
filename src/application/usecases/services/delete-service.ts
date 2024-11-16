import { Injectable } from "@nestjs/common"
import { BadRequestError } from "src/application/errors/error"
import { ServiceRepository } from "src/application/repositories/service-repository"

type DeleteServiceProps = {
    id: string
}

@Injectable()
export class DeleteService {
    constructor(private serviceRepo: ServiceRepository) {
    }

    async execute(props: DeleteServiceProps) {
       const service = await this.serviceRepo.findById(props.id)
       if(!service) throw new BadRequestError('Service Not found')

        service.IsDeleted = true

        await this.serviceRepo.update(service)

    }
}