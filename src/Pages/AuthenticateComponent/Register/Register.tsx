/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import './Register.css'
import { useNavigate } from "react-router-dom";
import { AccountCreateModel } from "../../../Model/Account/AccountCreateModel";
import { createAccount } from "../../../Responsitories/AccountResponsitory";
import { UserOptionsModel } from "../../../Model/User/UserOptionsModel";
import { createUser } from "../../../Responsitories/UserResponsitory";
const Register:React.FC=()=>{
    const navigate = useNavigate()
    const [register,setregister] = useState<AccountCreateModel>()
    const [user,setuser] = useState<UserOptionsModel>({
        id : "",
        email : "" ,
        phoneNumber : "" ,
        sex : 0,
        address : "" ,
        identityCard : "" ,
        accountID: "" ,
        memberCardID: "1",
        image: "" ,
    })
    const handleChangeAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setregister((prev) => ({
                ...prev,
                [name]: value,
            }));
            if(name == "email"){
                setuser((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            }
            
        };
    const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setuser((prev) => ({
                ...prev,
                [name]: value,
            }));
            
        };
    const handleSubmit = async () => {
        if(register?.password === register?.passwordCheck){
            if(user){
                const accountdata = await createAccount(register)
                setTimeout(async () => {
                    user.accountID = accountdata
                    await createUser(user)
                    
                },500);
    
            } 
            alert("Create Success")
            navtoLogin()
        }
        else if(register?.password !== register?.passwordCheck){
            alert("Mật khẩu và Xác nhận mật khẩu không trùng khớp!");
            return;
        }
        };
    
    function navtoLogin(){
        navigate(`/login`)
    }
    return(
        <div className='container'>
            <div className='register d-flex flex-column justify-content-center align-items-center'>
                <div className='register-title'>
                    <span>Create Account</span>
                </div>
                <div className='register-input'>
                    <div className='input-information d-flex flex-column justify-content-center gap-3'>
                        <span>Họ và tên</span>
                        <input type='text' name="userName" onChange={handleChangeUser}></input>
                        <span>Tài khoản</span>
                        <input type='text' name="userName" onChange={handleChangeAccount}></input>
                        <span>Mật khẩu</span>
                        <input type='password' name="password" onChange={handleChangeAccount}></input>
                        <span>Xác nhận mật khẩu</span>
                        <input type='password' name="passwordCheck" onChange={handleChangeAccount}></input>
                        <span>Email</span>
                        <input type='text' placeholder='Your Email' name="email" onChange={handleChangeAccount}></input>
                        <button onClick={handleSubmit} className='button-signin'>Create</button>
                    </div>
                </div>
                <div className='register-forgotpassword d-flex flex-row gap-3'>
                    <span onClick={navtoLogin} className='register-forgotpassword-items'>Already have an account</span>
                </div>
            </div>

        </div>
    )
}



export default Register
