/* eslint-disable @typescript-eslint/no-unused-vars */

import './CheckoutComponent.css'
import img from '../../../../Image/logo.jpg'
import React, { useEffect, useState } from 'react'

import { useShoppingCart } from '../../../../Hooks/useShoppingCart'
import { getProductByID } from '../../../../Responsitories/ProductResponsitory'

import { useNavigate } from 'react-router-dom'
import { UserModel } from '../../../../Model/User/UserModel'
import { getUserByID } from '../../../../Responsitories/UserResponsitory'
import { OrderCreateModel } from '../../../../Model/Order/OrderCreateModel'
import { createOrder } from '../../../../Responsitories/OrderResponsitory'
import { CreateListOrderDetail } from '../../../../Responsitories/OrderDetailResponsitory'
import { OrderDetailwithProduct } from '../../../../Model/RelationshipModel/OrderWithProduct/OrderWithProduct'
const CheckoutComponent:React.FC = () =>{
    const {cart} = useShoppingCart()
    const [orderswdetail,setorderswdetail] = useState<OrderDetailwithProduct[]>()
    const [order,setorder] = useState<OrderCreateModel>()
    const [error,seterror] = useState<OrderCreateModel>()
    const [user,setuser] = useState<UserModel>()
    const [total,settotal] = useState(0)
    const navigate = useNavigate()
    const userid = localStorage.getItem('id')
    useEffect(() => {    
        const fetchOrders = async () => {
          if (cart.length === 0) return;
      
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
          setorderswdetail(orderList); // Cập nhật orders  
          
        };
      
        fetchOrders();
      }, [cart]);
      //tinh tong tien
      useEffect(() => {
        if (orderswdetail && orderswdetail.length > 0) { //sum = bien tich luy, order = gia tri hien tai //Number(order.product.price) * order.quantity, 0 : tong tien cho san pham
            const totalprice = orderswdetail.reduce((sum, order) => sum + Number(order.product.price) * order.quantity, 0); //reduce: duyet qua tung phan tu va cong don gia tri
            settotal(totalprice);
        }
    }, [orderswdetail]);
    useEffect(()=>{
        fetchuserid()
    })
    const fetchuserid = async()=>{
        if(userid){
          const userdata = await getUserByID(userid)
          setuser(userdata)
        }
        console.log(user)
      }

    const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMsg = ""
        if(name === "customerName"){
            if (/[^A-Za-zÀ-ỹ\s]/.test(value)) {
                errorMsg = "Họ và tên chỉ được chứa chữ cái và khoảng trắng!";
              }
        }
        if (name === "customerPhone") {
            if (/\D/.test(value)) {
              errorMsg = "Số điện thoại chỉ được chứa số!";
            }
          }
        if(userid){
            setorder((prev)=>({
                ...prev,
                userID : userid,
                orderDate : new Date().toISOString(),
                orderStatus : "1",
                totalPrice : total,
                paymentMethod : "VietQR",
                paymentStatus :0,
                [name] : value 
            }))
        }else {
            setorder((prev)=>({
                ...prev,
                userID : "1",
                orderDate : new Date().toISOString(),
                orderStatus : "1",
                totalPrice : total,
                paymentMethod : "VietQR",
                paymentStatus :0,
                [name] : value 
            }))
        }
        seterror({...error,[name]:errorMsg})
        console.log(order)
        
    };

    
    const orderAccept = async (amount: number) => {
        console.log(amount)
        console.log(order)
        if (order) {
            const orderdata = await createOrder(order);
            console.log(orderdata)
            if (orderdata) {
                const orderDetails = orderswdetail?.map((detaildata) => ({ //Duyet qua tung object ==> result : array
                    orderID: orderdata,
                    productID: detaildata.product.id,
                    headType: detaildata.orderdetail.headType,
                    quantity: detaildata.quantity,
                    subtotal: detaildata.product.price,
                    promotionID: "1",
                }));
                await CreateListOrderDetail(orderDetails)
                // if(orderDetails){
                //     orderDetails.forEach(async element => {
                //             await createOrderDetail(element);
                //     }); 
                // }
            }
        }
        localStorage.removeItem('shopping-cart')
        navigate(`/payment/${amount}`);
    };
    

    return(
        <div className='container d-flex flex-row gap-5'>
            <div className='login d-flex flex-column justify-content-center align-items-center'>
                <div className='title'>
                    <span>Thanh toán</span>
                </div>
                <div className='login-input'>
                    <div className='input-information d-flex flex-column justify-content-center gap-3'>
                        <input type='text' name='customerName' onChange={handleOrderChange}  placeholder="Họ và tên"></input>
                        {error?.customerName && <p style={{ color: "red" }}>{error?.customerName}</p>}
                        <input type='text' name='shippingAddress' onChange={handleOrderChange} placeholder="Địa chỉ"></input>   
                        <input type='text' name='customerPhone' onChange={handleOrderChange}  placeholder="Số điện thoại"></input>
                        {error?.customerPhone && <p style={{ color: "red" }}>{error?.customerPhone}</p>}
                        <select id='shippingUnitID' name='shippingUnitID' onChange={()=>handleOrderChange}>
                            <option value="1">Viettel Post</option>
                        </select>
                        {/* <div className='checkout-payment-method d-flex flex-row gap-2'>
                        <img 
                            src={logomomo} 
                            alt="momo" 
                            className={`payment-img ${selected === 'momo' ? 'selected' : ''}`} 
                            onClick={() => setSelected('momo')} 
                        />
                            <img src={logovcb} alt='vcb' className={`payment-img ${selected === 'vcb' ? 'selected' : ''}`} 
                            onClick={() => setSelected('vcb')} />
                        </div> */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div className='checkout-return-cart'>
                                <i className="bi bi-chevron-left"></i>
                                <span>Trở về giỏ hàng</span>
                            </div>
                            <button className='checkout-button' onClick={()=> orderAccept(total)}>Xác nhận mua hàng</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="checkout-product-information d-flex flex-column gap-5">
                <div className='checkout-product d-flex flex-column gap-3'>
                    {Array.isArray(orderswdetail) && orderswdetail.map((orderwdetail) => (
                        <div key={orderwdetail.product.id} className="checkout-product-name-price d-flex flex-row justify-content-between align-items-center gap-2 ">
                            <div className='checkout-product-img'>
                                <img src={img}></img>
                            </div>
                            <div className="checkout-product-name d-flex flex-column">
                                <span className='checkout-product-name-detail'>{orderwdetail.product.name}</span>
                                <span className='checkout-product-category-detail'>Category: {orderwdetail.product.category}</span>
                            </div>
                            <div className="checkout-product-price mx-5">
                                <span>{(orderwdetail.product.price) * orderwdetail.quantity} VND</span>
                            </div>
                        </div>
                    ))}
                        <div className='checkout-product-total '>
                                <span className='checkout-product-total-title'>Tổng tiền: </span>
                                <span className='checkout-product-total-price'>{total.toLocaleString("vi-VN")} VND</span>
                        </div>
                </div>
                
            </div>
        </div>
    )
}





export default CheckoutComponent