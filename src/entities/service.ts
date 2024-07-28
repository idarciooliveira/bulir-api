import { randomUUID } from "crypto"

type ServiceProps = {
    name: string
    description: string
    price: number
    userId: string
}

export class Service {
    private _id: string
    private props: ServiceProps

    constructor(props: ServiceProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
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

    public get UserId() {
        return this.props.userId
    }

    public set UserId(value: string) {
        this.props.userId = value
    }
}