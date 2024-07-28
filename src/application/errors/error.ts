
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common"


export class NotFoundError extends NotFoundException {
    constructor(error: string) {
        super(`${error}`)
    }
}

export class BadRequestError extends BadRequestException {
    constructor(error: string) {
        super(`${error}`)
    }
}

export class AlreadyExistError extends BadRequestException {
    constructor(error: string) {
        super(`${error} Already exist`)
    }
}

export class NotAuthorizatedError extends UnauthorizedException {
    constructor() {
        super()
    }
}

export class InvalidUserCredential extends BadRequestException {
    constructor() {
        super('Invalid user credential')
    }
}
