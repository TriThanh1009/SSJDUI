/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import HomeComponent from '../../Pages/ShopComponent/components/HomeComponent/HomeComponent';
import ProductDetailComponent from '../../Pages/ShopComponent/components/ProductDetailComponent/ProductDetailComponent';
import CartComponent from '../../Pages/ShopComponent/components/CartComponent/CartComponent';
import CheckoutComponent from '../../Pages/ShopComponent/components/CheckoutComponent/CheckoutComponent';
import PaymentComponent from '../../Pages/ShopComponent/components/PaymentComponent/PaymentComponent';
import ProfileComponent from '../../Pages/ShopComponent/components/ProfileComponent/ProfileComponent';




interface RouteConfig{
    path:string;
    element: React.ReactNode;
    children?:RouteConfig[];
}

const routes: RouteConfig[]=[
    {path: '/home',element:<HomeComponent/>},
    {path:'productdetail/:product',element:<ProductDetailComponent/>},
    //{path:'/login',element:<Login/>},
    //{path:'/forgot',element:<Forgotpassword/>},
    //{path:'/register',element:<Register/>},
    {path:'/profile',element:<ProfileComponent/>},
    {path:'/cart',element:<CartComponent/>},
    {path:'/checkout',element:<CheckoutComponent/>},
    {path:'/payment/:amount',element:<PaymentComponent/>},
]
export default routes