import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { ServiceRepository } from "src/application/repositories/service-repository";
import { Service } from "src/application/entities/service";
import { PrismaServiceMapper } from "../mappers/prisma-service-mapper";


@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
    constructor(private readonly prismaService: PrismaService) { }
    
    async update(service: Service): Promise<void> {
        const raw = PrismaServiceMapper.toPrisma(service)
        await this.prismaService.service.update({
            data: raw,
            where: {
                id: service.Id
            }
        })
    }

    async findByUserId(userId: string): Promise<Service[]> {
        const services = await this.prismaService.service.findMany({
            where: {
                userId,
                isDeleted: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true
                    }
                }
            }
        })
        return services.map(PrismaServiceMapper.toDomain)
    }

    async save(service: Service): Promise<void> {
        const raw = PrismaServiceMapper.toPrisma(service)
        await this.prismaService.service.create({
            data: raw
        })
    }

    async findById(id: string): Promise<Service> {
        const service = await this.prismaService.service.findUnique({
            where: {
                id
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true
                    }
                }
            }
        })

        return PrismaServiceMapper.toDomain(service)
    }
    async getAll(): Promise<Service[]> {
        const services = await this.prismaService.service.findMany({
            where: {
                isDeleted: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullname: true
                    }
                }
            }
        })
        return services.map(PrismaServiceMapper.toDomain)
    }
}