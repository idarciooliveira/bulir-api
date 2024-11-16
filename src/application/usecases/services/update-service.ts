import { Injectable } from "@nestjs/common"
import { BadRequestError } from "src/application/errors/error"
import { ServiceRepository } from "src/application/repositories/service-repository"

type UpdateServiceProps = {
    id: string
    price: number
    name: string
    description: string
}

@Injectable()
export class UpdateService {
    constructor(private serviceRepo: ServiceRepository) {
    }

    async execute(props: UpdateServiceProps) {
       const service = await this.serviceRepo.findById(props.id)
       if(!service) throw new BadRequestError('Service Not found')

        service.Name = props.name;
        service.Price = props.price;
        service.Description = props.description;

        await this.serviceRepo.update(service)

    }
}