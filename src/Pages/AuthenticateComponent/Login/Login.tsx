/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css'
import { useEffect, useState } from 'react';
import { LoginAccess } from '../../../Responsitories/LoginRespository';
import { LoginModel } from '../../../Model/Login/LoginModel';
import { signInWithPopup } from 'firebase/auth';
 import { auth, googleProvider } from '../../../Responsitories/Firebase';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login(){
    const [account,setaccount] = useState<LoginModel>() 
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const navigate = useNavigate()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setaccount((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };
    useEffect(() => {
        handleLogin()
    }, [])
    useEffect(() => {
        const handleStorageChange = () => {
          setAccessToken(localStorage.getItem("accessToken"));
        };
      
        window.addEventListener("storage", handleStorageChange);
      
        return () => {
          window.removeEventListener("storage", handleStorageChange);
        };
      }, []);
      const handleLogin = async () =>{
        if(accessToken){
            const decodeToken = jwtDecode<{ [key: string]: any }>(accessToken);
            const getrole = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            console.log(getrole)
            if (getrole) {
                if (getrole === "Admin") {
                    navigate("/admin/account");
                } else if(getrole === "Customer")  {
                    navigate("/");
                } else if(getrole === null || getrole === ""){
                    navigate("/login")
                }
            }
        }
    }
    const handleGoogleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          console.log(result.user)
          localStorage.setItem('loginMethod',"google")
          navigate("/");
        } catch (err: any) {
          console.error(err);
        }
      };
        
    

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        await LoginAccess(account)
        localStorage.setItem('loginMethod',"account")
        window.location.reload()
    }

    function navtoRegister(){
        navigate(`/register`)
    }

    function navtoForgotpassword(){
        navigate(`/forgot`)
    }


     return(
        <div className='container'>
            <div className='login d-flex flex-column justify-content-center align-items-center'>
                <div className='title'>
                    <span>Login</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='login-input'>
                        <div className='input-information d-flex flex-column justify-content-center gap-3'>
                            <span>Tài khoản</span>
                            <input type='text' name='username' onChange={handleChange} placeholder='Your Email'></input>
                            <span>Mật khẩu</span>
                            <input type='password' name='password' onChange={handleChange}></input>
                            <button className='button-signin'>Sign In</button>
                        </div>
                    </div>
                </form>
                <div>
                     <button className='login-with-google-button' onClick={handleGoogleLogin}>Đăng nhập với Google</button>
                     </div>
                <div className='register-forgotpassword d-flex flex-row gap-3'>
                    <span className='register-forgotpassword-items' onClick={navtoForgotpassword}>Forgot your password ?</span>
                    <span>/</span>
                    <span className='register-forgotpassword-items' onClick={navtoRegister}>Register Account</span>
                </div>
            </div>
        </div>
    )
}

export default Login
