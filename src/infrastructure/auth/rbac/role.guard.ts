import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEYS } from "./role.decorator";
import { Role } from "src/application/entities/user";

export class TokenDto {
    id: string
    role: string
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private refletor: Reflector) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.refletor.getAllAndOverride<Role[]>(ROLE_KEYS, [
            context.getHandler(),
            context.getClass()
        ])

        const request = context.switchToHttp().getRequest()

        return requiredRoles.some((role) => request.user.role.includes(role))
    }
}