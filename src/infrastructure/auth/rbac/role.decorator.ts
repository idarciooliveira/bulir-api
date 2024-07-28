import { SetMetadata } from "@nestjs/common"

export const ROLE_KEYS = 'role'
export const Role = (...role: string[]) => SetMetadata(ROLE_KEYS, role)