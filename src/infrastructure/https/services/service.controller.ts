import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/infrastructure/auth/passport/jwt-auth.guard";
import { ServiceViewModel } from "./service-view-model";
import { GetAllService } from "src/application/usecases/services/get-all-services";
import { GetServiceById } from "src/application/usecases/services/get-service-by-id";
import { GetServicesByUserId } from "src/application/usecases/services/get-services-by-userId";
import { CreateServiceDto } from "./service.dto";
import { GetCurrentUserId } from "src/infrastructure/auth/rbac/user.decorator";
import { CreateService } from "src/application/usecases/services/create-service";
import { Roles } from "src/infrastructure/auth/rbac/role.decorator";
import { Role } from "src/application/entities/user";
import { RoleGuard } from "src/infrastructure/auth/rbac/role.guard";

@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
    constructor(private createService: CreateService,
        private getAllServices: GetAllService,
        private getServicesByUserId: GetServicesByUserId,
        private getServiceById: GetServiceById) { }

    @UseGuards(RoleGuard)
    @Roles(Role.SERVICE_PROVIDER)
    @Post()
    async create(@Body() body: CreateServiceDto,
        @GetCurrentUserId() userId: string) {

        const service = await this.createService.execute({
            ...body,
            userId
        })

        return ServiceViewModel.toHTTP(service)
    }


    @Get()
    async findAll() {
        const services = await this.getAllServices.execute()
        return services.map(ServiceViewModel.toHTTP)
    }

    @Get('/:id/users')
    async findAllByUserId(@Param('id') id: string) {
        const services = await this.getServicesByUserId.execute(id)
        return services.map(ServiceViewModel.toHTTP)
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        const service = await this.getServiceById.execute(id)
        return ServiceViewModel.toHTTP(service)
    }

}