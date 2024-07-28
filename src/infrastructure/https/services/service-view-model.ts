import { Service } from "../../../application/entities/service";

export class ServiceViewModel {
    static toHTTP(service: Service) {
        return {
            id: service.Id,
            name: service.Name,
            description: service.Description,
            price: service.Price,
            userId: service.UserId
        };
    }
}
