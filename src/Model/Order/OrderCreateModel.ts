export interface OrderCreateModel{
    userID? : string
    customerName? : string
    customerPhone? :string
    orderDate? : string
    shippingUnitID? : string
    shippingAddress? : string
    orderStatus? : string
    totalPrice? : number
    paymentMethod? : string
    paymentStatus? : number
}