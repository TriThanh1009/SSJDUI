/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import  './AdminHeaderComponent.css';
import logo from '../../../Image/chill.jpg'
import { signalRService } from '../../../Responsitories/SignalrResponsitory';
import { useNavigate } from 'react-router-dom';
const AdminHeaderComponent:React.FC = ()=>{
  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false); // Điều khiển hiển thị danh sách
  const navigate = useNavigate()
  useEffect(()=>{
    signalRService.startConnection()
    signalRService.listenForNotifications((data)=>{
      setNotifications((prev)=>[data,...prev])
      setUnreadCount((prev)=>prev+1)
      alert(`${data}`)
    })
    
    return ()=> signalRService.removeListener()
  })
  function handlebellclick(){
    setShowNotifications((prev)=>!prev)
    setUnreadCount(0)
  }
  function LogoutFeature(){
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div className='admin-container'>
      <div className='admin-header d-flex flex-row justify-content-between align-items-center'>
        <div className='admin-header-left'>
          <div className='header-search'>
            <input className='header-search-input' placeholder='  Search for....'></input>
            {/* <i className="bi bi-search"></i> */}
          </div>
        </div>
        <div className='admin-header-right d-flex flex-row justify-content-center align-items-center gap-3'>
        <div className="notification-container">
          <div className="notification-icon" onClick={handlebellclick}>
            <i className="bi bi-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </div>

            {showNotifications && (
              <ul className="notification-list">
                {notifications.map((noti, index) => (
                  <li key={index}>{noti}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            Thanh
          </div>
          <div className="account-container">
          {/* Ảnh đại diện */}
          <div className="account-image" onClick={() => setShowMenu(!showMenu)}>
            <img src={logo}  />
          </div>

          {/* Menu Logout */}
          {showMenu && (
            <div className="dropdown-menu-logout">
              <button onClick={() => LogoutFeature()} className="logout-button">Logout</button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeaderComponent
