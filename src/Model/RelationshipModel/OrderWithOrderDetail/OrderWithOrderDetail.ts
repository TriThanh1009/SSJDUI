import { OrderDetailModel } from "../../OrderDetail/OrderDetailModel"



export interface OrderWithOrderDetail {
    orderID : string
    orderDetails : OrderDetailModel[]
}

