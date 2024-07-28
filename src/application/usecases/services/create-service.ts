import { Injectable } from "@nestjs/common"
import { Service } from "src/application/entities/service"
import { NotFoundError } from "src/application/errors/error"
import { ServiceRepository } from "src/application/repositories/service-repository"
import { UserRepository } from "src/application/repositories/user-repository"

type CreateServiceProps = {
    name: string
    description: string
    price: number
    userId: string
}

@Injectable()
export class CreateService {
    constructor(private serviceRepo: ServiceRepository,
        private userRepo: UserRepository) {
    }

    async execute(props: CreateServiceProps) {
        if (!await this.userRepo.findById(props.userId))
            throw new NotFoundError('User')

        const service = new Service({
            ...props
        })

        await this.serviceRepo.save(service)

        return service
    }
}