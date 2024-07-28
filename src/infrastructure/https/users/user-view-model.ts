import { User } from "../../../application/entities/user";

export class UserViewModel {
    static toHTTP(user: User) {
        return {
            id: user.Id,
            fullname: user.Fullname,
            email: user.Email,
            role: user.Role,
        };
    }
}
