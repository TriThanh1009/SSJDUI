import { UserWithProduct } from "../RelationshipModel/UserWithProduct/UserWithProduct"

export interface UserOrderProfile{
    userName : string
    point : number
    address: string
    phoneNumber : string
    product : UserWithProduct[]
}