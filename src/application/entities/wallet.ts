
import { randomUUID } from "crypto"

type WalletProps = {
    balance: number
    userId: string
}

export class Wallet {
    private _id: string
    private props: WalletProps

    constructor(props: WalletProps, id?: string) {
        this._id = id ?? randomUUID()
        this.props = props
    }

    public get Id() {
        return this._id
    }

    public get Balance() {
        return this.props.balance
    }

    public set Balance(value: number) {
        this.props.balance = value
    }

    public get UserId() {
        return this.props.userId
    }

    public set UserId(value: string) {
        this.props.userId = value
    }

}