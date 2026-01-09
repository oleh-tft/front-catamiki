import type { AddressType } from "./AddressType"

type UserType = {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    phone?: string,
    address: AddressType
}

export type { UserType }