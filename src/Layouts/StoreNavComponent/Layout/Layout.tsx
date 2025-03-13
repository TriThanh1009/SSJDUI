import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import React, { ReactNode } from 'react';
import './Layout.css'

interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div className="store-layout d-flex flex-column">
        <div className="store-header">
          <Header />
        </div>
        <div className="content flex-grow-1">
          {children}
        </div>
        <div className="store-footer">
          <Footer />
        </div>
      </div>
    );
  };



export default Layout