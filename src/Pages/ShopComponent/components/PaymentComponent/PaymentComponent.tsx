import { useParams } from "react-router-dom";

import './PaymentComponent.css'
import { useEffect, useState } from "react";

const PaymentComponent = () => {
    
    const { amount } = useParams(); // Lấy giá trị method từ URL
    const [qrurl,setqrurl] = useState("")
    
    useEffect(()=>{
        const fetchqr = async () =>{
            const url = `https://img.vietqr.io/image/vcb-1017965388-qr_only.png?amount=${amount}&addInfo=1`
            setqrurl(url)
            localStorage.removeItem('shopping-cart')
        }
        fetchqr()
    },[amount])
    
    return (
        <div className='payment-container d-flex justify-content-center gap-5'>
            <div className="payment-logo d-flex justify-content-center align-items-center">
                {qrurl ? (
                    <img src={qrurl} alt="QR Code" />

                ) : (
                    <p>Đang tải thông tin thanh toán...</p>
                )}
            </div>
            <div className="d-flex flex-column gap-2">
                 <span>Số tài khoản : 1017965388</span>
                 <span>Chủ tài khoản : Nguyễn Trí Thanh</span>
                 <span>Khi thanh toán xong, các bạn vui lòng gửi hình ảnh thanh toán qua zalo: 0358171720 ạ.</span>
                 <span>Cảm ơn bạn đã tin tưởng và ủng hộ.</span>
            </div>


        </div>
    );
};

export default PaymentComponent;
