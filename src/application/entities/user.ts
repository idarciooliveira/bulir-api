import { randomUUID } from "crypto"

export enum Role {
    CUSTUMER = "CUSTUMER",
    SERVICE_PROVIDER = "SERVICE_PROVIDER"
}
type UserProps = {
    fullname: string
    nif: string
    email: string
    password: string
    role: string
}

export class User {
    private _id: string
    private props: UserProps

    constructor(props: UserProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = {
            ...props
        }
    }

    public get Id() {
        return this._id
    }

    public get Fullname() {
        return this.props.fullname
    }

    public set Fullname(value: string) {
        this.props.fullname = value
    }

    public get Password() {
        return this.props.password
    }

    public set Password(value: string) {
        this.props.password = value
    }

    public get Nif() {
        return this.props.nif
    }

    public set Nif(value: string) {
        this.props.nif = value
    }

    public get Email() {
        return this.props.email
    }

    public set Email(value: string) {
        this.props.email = value
    }

    public get Role() {
        return this.props.role
    }

    public set Role(value: string) {
        this.props.role = value
    }
}