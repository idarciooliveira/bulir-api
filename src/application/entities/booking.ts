
import { randomUUID } from "crypto"
import { User } from "./user"
import { Service } from "./service"

export enum BookingStatus {
    COMPLETED = 'COMPLETA',
    CANCELLED = 'CANCELADO',
    CONFIRMED = 'CONFIRMADO',
    PENDING = 'PENDENTE'
}
type BookingProps = {
    code: string
    custumerId: string
    providerId: string
    serviceId: string
    status: string
    startAt: Date
    createdAt: Date
    total: number
    provider?: User
    service?: Service
    custumer?: User

}

export class Booking {
    private _id: string
    private props: BookingProps

    constructor(props: BookingProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    public get Id() {
        return this._id
    }

    public get Code() {
        return this.props.code
    }

    public set Code(value: string) {
        this.props.code = value
    }

    public get CustumerId() {
        return this.props.custumerId
    }

    public set CustumerId(value: string) {
        this.props.custumerId = value
    }

    public get ProviderId() {
        return this.props.providerId
    }

    public set ProviderId(value: string) {
        this.props.providerId = value
    }

    public get Total() {
        return this.props.total
    }

    public set Total(value: number) {
        this.props.total = value
    }

    public get CreatedAt() {
        return this.props.createdAt
    }

    public set CreatedAt(value: Date) {
        this.props.createdAt = value
    }

    public get StartAt() {
        return this.props.startAt
    }

    public set StartAt(value: Date) {
        this.props.startAt = value
    }

    public get ServiceId() {
        return this.props.serviceId
    }

    public set ServiceId(value: string) {
        this.props.serviceId = value
    }

    public get Status() {
        return this.props.status
    }

    public set Status(value: string) {
        this.props.status = value
    }

    public get Provider() {
        return this.props.provider
    }

    public set Provider(value: User) {
        this.props.provider = value
    }

    public get Custumer() {
        return this.props.custumer
    }

    public set Custumer(value: User) {
        this.props.custumer = value
    }

    
    public get Service() {
        return this.props.service
    }

    public set Service(value: Service) {
        this.props.service = value
    }
}