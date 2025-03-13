import React, { useState } from "react"
import { Link } from "react-router-dom";
import './AdminSideBarComponent.css'

const AdminSideBarComponent:React.FC = ()=>{
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
    return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <div className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Store</div>
      </div>


      {/* Divider */}
      <hr className="sidebar-divider" />



      {/* Nav Item - Pages Collapse Menu */}
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={toggleMenu}
        style={{ cursor: "pointer" }}
      >
        <h5 className="mb-0">Pages</h5>
        <i
          className={`bi bi-chevron-${isOpen ? "up" : "down"}`}
          style={{ fontSize: "1.2rem" }}
        ></i>
      </div>

      {/* Collapsible Menu */}
      {isOpen && (
        <div className="list-component d-flex flex-column gap-2">
          <Link to="/admin/account">Account</Link>
          <Link to="/admin/product">Product</Link>
          <Link to="/admin/category">Category</Link>
          <Link to="/admin/membercard">Member Card</Link>
          <Link to="/admin/Order">Order</Link>
          <Link to="/admin/promotion">Promotion</Link>
          <Link to="/admin/unitship">Unit Shipping</Link>
          <Link to="/admin/user">User</Link>
        </div>
      )}

    </ul>
    
    )
}


export default AdminSideBarComponent