import { Service as RawService } from '@prisma/client'
import { Service } from '../../../../application/entities/service';
import { Replace } from 'src/helpers/replace';

export class PrismaServiceMapper {
    static toPrisma(service: Service): RawService {
        return {
            id: service.Id,
            description: service.Description,
            name: service.Name,
            price: service.Price,
            userId: service.UserId,
            isDeleted: service.IsDeleted
        };
    }

    static toDomain(raw: Replace<RawService, {user: any}>): Service {
        return new Service(
            {
                description: raw.description,
                name: raw.name,
                price: raw.price,
                userId: raw.userId,
                user: raw.user,
                isDeleted: raw.isDeleted
            },
            raw.id,
        );
    }
}
