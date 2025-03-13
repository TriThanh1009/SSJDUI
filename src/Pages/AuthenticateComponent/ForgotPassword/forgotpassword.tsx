import React from "react";
import "./forgotpassword.css"
import { useNavigate } from "react-router-dom";
const Forgotpassword:React.FC=()=>{
    const navigate = useNavigate()
    function navtoLogin(){
        navigate(`/Login`)
    }
    return(
        <div className='container'>
            <div className='forgot d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <span className='title-reset'> Reset your Password</span>
                    <span>We will sent you an email to reset your password</span>
                </div>
                <div className='forgot-input'>
                    <div className='forgot-information d-flex flex-column justify-content-center gap-3'>
                        <span>Email</span>
                        <input type='text' placeholder='Your Email'></input>
                        <button className='button-signin'>Submit</button>
                    </div>
                    <div className="forgot-cancel">
                        <span className="forgot-cancel-item" onClick={navtoLogin}>Cancel</span>
                    </div>
                </div>
            </div>

        </div>
    )
}



export default Forgotpassword;