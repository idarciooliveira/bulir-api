import { randomUUID } from "crypto"
import { User } from "./user"

type ServiceProps = {
    name: string
    description: string
    price: number
    userId: string
    isDeleted?: boolean
    user?: User
}

export class Service {
    private _id: string
    private props: ServiceProps

    constructor(props: ServiceProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            isDeleted: false
        }
    }

    public get Id() {
        return this._id
    }

    public get Name() {
        return this.props.name
    }

    public set Name(value: string) {
        this.props.name = value
    }

    public get Description() {
        return this.props.description
    }

    public set Description(value: string) {
        this.props.description = value
    }

    public get Price() {
        return this.props.price
    }

    public set Price(value: number) {
        this.props.price = value
    }

    public get IsDeleted() {
        return this.props.isDeleted
    }

    public set IsDeleted(value: boolean) {
        this.props.isDeleted = value
    }

    public get UserId() {
        return this.props.userId
    }

    public set UserId(value: string) {
        this.props.userId = value
    }

    public get User() {
        return this.props.user
    }

    public set User(value: User) {
        this.props.user = value
    }
}