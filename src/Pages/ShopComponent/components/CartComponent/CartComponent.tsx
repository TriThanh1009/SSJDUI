/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { Button, Stack, Table } from "react-bootstrap";
import { useShoppingCart } from "../../../../Hooks/useShoppingCart";
import { getProductByID } from "../../../../Responsitories/ProductResponsitory";

import './CartComponent.css'
import { useNavigate } from "react-router-dom";
import { OrderDetailwithProduct } from "../../../../Model/RelationshipModel/OrderWithProduct/OrderWithProduct";



const CartComponent: React.FC = () => {
  const {cart,removeFromCart,decreaseCartQuantity,increaseCartQuantity} = useShoppingCart()
  const [orders,setorder] = useState<OrderDetailwithProduct[]>()
  const navigate = useNavigate()
  //const [products,setproducts] = useState<ProductModel[]>()
  useEffect(() => {
    fetchOrders()
  }, [cart]);
  const fetchOrders = async () => {
    if (cart.length === 0){
      setorder([])
      return
    } 

    const orderList: OrderDetailwithProduct[] = await Promise.all(
      cart.map(async (item) => {
        const product = await getProductByID(item.productID);
        return { 
          product: product,  // Thông tin sản phẩm
          quantity: item.quantity, // Lấy quantity từ cart
          orderdetail : item
        }; 
        
      })      
    );
    setorder(orderList); // Cập nhật orders
  };

  function NavToCheckout(){
    navigate('/checkout')
  }

  function handleRemove(id : string,headtype:string){
    console.log(id)
    removeFromCart(id,headtype)
    localStorage.removeItem("shopping-cart"); 
    orders?.filter(item=>item.product.id ===id)

    window.location.reload()
  }
    return (
      <div>
      <Stack>
        <div className="container mt-4">
        <h2>Shopping Cart</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.map((order) => (
              <tr key={order.product.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <strong>{order.product.name}</strong>
                      <br />
                      <div className="d-flex flex-row gap-2">
                        <small>Type: {order.product.category}</small>
                        <small>Head: {order.orderdetail?.headType}</small>
                      </div>
                      
                    </div>
                  </div>
                </td>
                <td>${(order.product.price * order.quantity)}</td>
                <td className="">
                  <i  onClick={()=>order.orderdetail.headType && decreaseCartQuantity(order.product.id,order.orderdetail.headType)} className="bi bi-caret-left"></i>
                  <span className="mx-2">{order.quantity}</span>
                  <i onClick={()=>order.orderdetail.headType &&increaseCartQuantity(order.product.id,order.orderdetail.headType)} className="bi bi-caret-right"></i>
                </td>
                
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>order.orderdetail.headType && handleRemove(order.product.id,order.orderdetail.headType)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Stack>
      <div className="shopping-cart-purchase d-flex justify-content-center align-items-center">
           <button onClick={NavToCheckout} className="product-detail-quantity-add-to-card btn btn-pink text-white">
                 Thanh toán
          </button>
              </div>
      </div>

    )
}



export default CartComponent