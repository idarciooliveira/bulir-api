import { Service as RawService } from '@prisma/client'
import { Service } from '../../../../application/entities/service';

export class PrismaServiceMapper {
    static toPrisma(service: Service): RawService {
        return {
            id: service.Id,
            description: service.Description,
            name: service.Name,
            price: service.Price,
            userId: service.UserId
        };
    }

    static toDomain(raw: RawService): Service {
        return new Service(
            {
                description: raw.description,
                name: raw.name,
                price: raw.price,
                userId: raw.userId
            },
            raw.id,
        );
    }
}
