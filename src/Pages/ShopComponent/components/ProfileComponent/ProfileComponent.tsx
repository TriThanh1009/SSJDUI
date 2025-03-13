/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import './ProfileComponent.css';
import { editUser, GetUserProfileById } from '../../../../Responsitories/UserResponsitory';
import { UserOrderProfile } from '../../../../Model/User/UserOrderProfile';
import { UserOptionsModel } from '../../../../Model/User/UserOptionsModel';


const ProfileComponent:React.FC = () => {
  const userId = localStorage.getItem('id');
  const apiUrl = import.meta.env.VITE_API_GET_IMG;
  const [profile,setprofile] = useState<UserOrderProfile>()
  const [user,setuser] = useState<UserOptionsModel>({
          id : userId?? '',
          email : "" ,
          phoneNumber : "" ,
          sex : 0,
          address : "" ,
          identityCard : "" ,
          accountID: "" ,
          memberCardID: "1",
          image: "" ,
      })
  const [formEdituser,setformEdituser] = useState(false)
  useEffect(() => {
    fetch()
  },[profile]);
  const fetch = async () => {
    if(userId){
      const profiledata = await GetUserProfileById(userId)
      setprofile(profiledata)
    }
    
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setuser((prev) => ({
              ...prev,
              [name]: value,
              
          }));
          console.log(user)
      };
  function editprofilebutton(){
    setformEdituser(prev => !prev)
  }

  const editsubmit = async (e:React.FormEvent)=>{
    e.preventDefault()
    await editUser(user)
  }


  return(
  <div className='container'>
    <div className='profile'>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <span className='content-title'>My Account</span>
        <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
          <span>Welcome back, {profile?.userName}</span>
          {/* <div>Your Points Balance : {profile?.point}</div> */}
        </div>
        <div>
            {/* <button className='redeem-button'>Redeem Points</button> */}
        </div>
        <div>
            <button onClick={editprofilebutton} className='redeem-button'>Cập nhật thông tin</button>
        </div>
      </div>
      <div className='profile-detail'>
        <div className='content-title'>Account Details</div>
        <div className='profile-detail-infor d-flex flex-column gap-2'>
          {!formEdituser && 
          <div className='d-flex flex-column gap-2'>
            <span>User Name :  {profile?.userName}</span> 
            <span>Phone:  {profile?.phoneNumber}</span>
            <span>Address: {profile?.address}</span>
          </div>}
          {formEdituser && <form onSubmit={editsubmit} className='profile-detail-edit d-flex flex-column gap-2'>
            <input type='text' placeholder='Họ và tên' name='userName' onChange={handleChange}></input>
            <input type='text' placeholder='Số điện thoại' name='phoneNumber' onChange={handleChange}></input>
            <input type='text' placeholder='Địa chỉ' name='address' onChange={handleChange}></input>
            {/* <input type='text' placeholder='Căn cước công dân' name='identityCard' onChange={handleChange}></input> */}
            <button >Accept</button>
          </form>
          }     
        </div>
      </div>
      <div className='order-history'>
        <span className='order-history-title'>Lịch sử đơn hàng</span>
        {Array.isArray(profile?.product) && profile.product.map((prod)=>(    
        <div className='order-history-detail d-flex flex-column gap-2'>
            <span>{prod.orderDate.toString().split("T")[0]}</span> 
            <span>{prod.productName}</span>
            <img className='product-list-img' src={`${apiUrl}${prod.productImage}`}></img>
        </div>
        ))}
      </div>
    </div>
</div>
  )
}
export default ProfileComponent