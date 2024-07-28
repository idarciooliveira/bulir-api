import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserRepository } from "src/application/repositories/user-repository";
import { User } from "src/application/entities/user";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";


@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) { }

    async save(user: User): Promise<void> {
        const raw = PrismaUserMapper.toPrisma(user)
        await this.prismaService.user.create({
            data: raw
        })
    }

    async findByNif(nif: string): Promise<boolean> {
        return !!await this.prismaService.user.findUnique({
            where: {
                nif
            }
        })
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (!user) return null

        return PrismaUserMapper.toDomain(user)
    }

    async findById(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })

        if (!user) return null

        return PrismaUserMapper.toDomain(user)
    }
    async getAll(): Promise<User[]> {
        const users = await this.prismaService.user.findMany()
        return users.map(PrismaUserMapper.toDomain)
    }
}