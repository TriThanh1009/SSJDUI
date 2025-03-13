
import React, { ReactNode } from 'react';
import './AdminLayoutComponent.css'
import AdminHeaderComponent from '../AdminHeaderComponent/AdminHeaderComponent';
import AdminSideBarComponent from '../AdminSideBarComponent/AdminSideBarComponent';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
  }
  
  const AdminLayoutComponent: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container-fluid vh-100">
          <div className="row h-100">
            <div className="col-2 p-3">
              <AdminSideBarComponent />
            </div>
            <div className="col-10 p-3">
              <div className="admin-layout d-flex flex-column">
                <div className="admin-header">
                  <AdminHeaderComponent />
                </div>
                <div className="content">
                  {children}
                  <Outlet /> {/* Render các route con */}
                </div>
                <div className="admin-footer">
                  <span>Copyright by Turtle, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  };



export default AdminLayoutComponent