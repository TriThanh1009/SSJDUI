/* eslint-disable @typescript-eslint/no-unused-vars */

import { OrderDetailModel } from "../../OrderDetail/OrderDetailModel";
import { ProductModel } from "../../Product/ProductModel";


export interface OrderDetailwithProduct {
  orderdetail: OrderDetailModel
  product: ProductModel; // Thông tin sản phẩm
  quantity: number; // Số lượng từ car
}

