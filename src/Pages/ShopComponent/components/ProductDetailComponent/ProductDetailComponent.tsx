/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
import './ProductDetailComponent.css'
import { useNavigate, useParams } from "react-router-dom"
import { ProductModel } from "../../../../Model/Product/ProductModel"
import { getProductByID } from "../../../../Responsitories/ProductResponsitory"
import { useShoppingCart } from "../../../../Hooks/useShoppingCart"
import { ProductDetailModel } from "../../../../Model/ProductDetail/ProductDetailModel"
import { getdescriptionByproductID} from "../../../../Responsitories/ProductDetailResponsitory"
const ProductDetailComponent:React.FC = () =>{
    const {increaseCartQuantity} = useShoppingCart()
    const apiUrl = import.meta.env.VITE_API_GET_IMG;
    const {product} = useParams()
    const [takeproduct,settakeproduct] = useState<ProductModel>()
    const [productdetail,setproductdetail] = useState<ProductDetailModel>()
    const [selectheadtype, setselectheadtype] = useState<string>("");
    const navigate = useNavigate()
    useEffect(()=>{
        const fetch = async() =>{
            const data = await getProductByID(product)
            const descriptiondata = await getdescriptionByproductID(product)
            settakeproduct(data)    
            setproductdetail(descriptiondata)
            
        }
        fetch()
        console.log(selectheadtype)
    },[])
    const [count,setcount] = useState(1)
    const increase = () => {setcount(count+1)}
    const decrease = () => {if(count>1) setcount(count-1)}
    const handleAddToCart = () => {
        if (takeproduct?.id) {
            for (let i = 0; i < count; i++) {
                increaseCartQuantity(takeproduct.id,selectheadtype);
            }
            navigate('/cart')
        }

    };
    return(
        <div>
            <div className="d-flex flex-row gap-5">
                <div className="product-detail-img col-6">
                    <img src={`${apiUrl}${takeproduct?.image}`}></img>
                </div>
                <div className="col-6">
                    <div className="product-detail-brand">
                        <span>{takeproduct?.name}</span>
                    </div>
                    <div className="product-detail-price">
                        <span>{takeproduct?.price.toLocaleString("vi-VN")}</span>
                    </div>
                    <div className="product-detail-description d-flex flex-column mt-3 gap-3">
                        <div className="d-flex gap-2">
                            <ul>            
                            {productdetail?.description?.map((desc, index) => (
                                <li key={index} className="d-flex gap-2">
                                    <i className="bi bi-flower3"></i>
                                    <span>{desc}</span>                                              
                                </li>
                            ))}
                            </ul>
                        </div>
                        
                    </div>
                    <div className="product-detail-tips d-flex flex-row gap-3 mt-3">
                        <div onClick={() =>setselectheadtype('brushchisel')} className={`product-detail-tips-options ${selectheadtype === 'brushchisel' ? 'selected' : ''}`} >
                            <span>Brush & Chisel</span>
                        </div>
                        <div onClick={() =>setselectheadtype('brushfine')} className={`product-detail-tips-options ${selectheadtype === 'brushfine' ? 'selected' : ''}`}>
                            <span>Brush & Fine</span>
                        </div>
                    </div>
                    <div className="product-detail-availability d-flex flex-column mt-3 gap-2">
                        <span className="product-detail-availability-avai">Availability</span>
                        <span>Pre-Order</span>
                    </div>
                    <div className="product-detail-quantity mt-3">
                        <span >Quantity</span>
                        <div className="product-detail-quantity-count d-flex gap-2 justify-content-center align-items-center">
                            <i className="bi bi-dash product-detail-quantity-click" onClick={decrease}></i>
                            <span className="">{count}</span>
                            <i className="bi bi-plus product-detail-quantity-click" onClick={increase}></i>
                        </div>
                    </div>
                    <div className="mt-5">
                    <button onClick={handleAddToCart} className="product-detail-quantity-add-to-card btn btn-pink text-white">
                        Add to Cart
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}







export default ProductDetailComponent