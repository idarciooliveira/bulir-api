import { User as RawUser } from '@prisma/client'
import { User } from '../../../../application/entities/user';

export class PrismaUserMapper {
    static toPrisma(user: User) {
        return {
            id: user.Id,
            fullname: user.Fullname,
            nif: user.Nif,
            password: user.Password,
            role: user.Role
        };
    }

    static toDomain(raw: RawUser): User {
        return new User(
            {
                email: raw.email,
                fullname: raw.fullname,
                nif: raw.nif,
                password: raw.password,
                role: raw.role
            },
            raw.id,
        );
    }
}
