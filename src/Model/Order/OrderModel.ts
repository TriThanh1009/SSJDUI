export interface OrderModel{
    id : string
    customerName : string
    customerPhone : string
    orderDate : Date
    shippingUnit : string
    shippingAddress : string
    orderStatus : string
    totalPrice : number
    paymentMethod : string
    paymentStatus : number
}