/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Footer.css'
import { UserModel } from '../../../Model/User/UserModel'
import { getUserByID } from '../../../Responsitories/UserResponsitory';
const Footer:React.FC=()=>{
    const [userid] = useState(localStorage.getItem("id"));
    const [user,setuser] = useState<UserModel>()

    useEffect(()=>{
            fetchdatabyuserid()
        })
    
    const fetchdatabyuserid = async() =>{
        if(userid){
            const data = await getUserByID(userid)
            setuser(data)
        }
            //
    }
    return(
        <div className="container footer-margin">
                <div className='d-flex flex-column justify-content-center align-items-center register-email gap-2'>
                    {user && 
                    <div className='footer-user-name'>
                        <span>Welcome, {user?.userName}</span>
                    </div>}  
                    {!user && <div>
                        <button className='sign-up-button'>Sign Up</button>
                    </div>}
                    <span>
                    Bạn có thể gửi thắc mắc qua zalo để có nhiều ưu đãi và dễ dàng được tư vấn
                    </span>                  
                    <span>
                        Chúng tôi luôn mang đến những sản phẩm chính hãng và tuyệt vời nhất đến từ Ohuhu
                    </span>
                    
                </div>
                <div className='information d-flex flex-row '>
                    <div className='information-support col-3'>
                        <div className='support'>
                            <div className='title-content-footer'>
                                SUPPORT
                            </div>
                            <div className='items d-flex flex-column gap-2'>
                                <span className='item-material'>Return and Refund</span>
                                <span className='item-material'>Delivery and Shipping</span>
                                <span className='item-material'>Privacy Policy</span>
                                <span className='item-material'>Term of Service</span>
                            </div>
                        </div>
                    </div>
                    <div className='information-program col-3'>
                        <div className='program'>
                            <div className='title-content-footer'>
                                PROGRAM
                            </div>
                            <div className='items d-flex flex-column gap-2'>
                                <span className='item-material'>Refer Ohuhu to Friends</span>
                                <span className='item-material'>Gift Card</span>
                                <span className='item-material'>Education Discount</span>
                                <span className='item-material'>Ohuhu Aniversaries</span>
                            </div>
                        </div>
                    </div>
                    <div className='information-customer-care col-3'>
                        <div className='program'>
                            <div className='title-content-footer'>
                                CUSTOMER CARE
                            </div>
                            <div className='items d-flex flex-column gap-2'>
                                <span className='item-material'>About Ohuhu</span>
                                <span className='item-material'>My Account</span>
                                <span className='item-material'>Contact Us</span>
                                <span className='item-material'>Order Tracking</span>
                            </div>
                        </div>
                    </div>
                    <div className='information-about-me col-3'>
                        <div className='title-content-footer'>
                            STORE SOCIAL
                        </div>
                        <div className='items-icon d-flex flex-row gap-3'>
                            <span> <i className="bi bi-facebook items-icons"></i> </span>
                            <span> <i className="bi bi-instagram items-icons"></i> </span>
                            <span> <i className="bi bi-threads items-icons"></i> </span>
                        </div>
                        <span className='items'>
                            Phone: 0358171720
                        </span>
                    </div>
                </div>
                <div className='copy-right'>
                Copyright © 2025, Turtle. All rights reserved. See our terms of use and privacy notice.
                </div>
        </div>
    )
}


export default Footer