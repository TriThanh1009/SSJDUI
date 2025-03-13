import AdminAccountComponent from "../../Pages/AdminComponent/components/AdminAccount/AdminAccountComponent/AdminAccountComponent";
import AdminCategoryComponent from "../../Pages/AdminComponent/components/AdminCategory/AdminCategoryComponent/AdminCategoryComponent";
import AdminMemberCardComponent from "../../Pages/AdminComponent/components/AdminMemberCard/AdminMemberCardComponent/AdminMemberCardComponent";
import AdminOrderComponent from "../../Pages/AdminComponent/components/AdminOrder/AdminOrderComponent/AdminOrderComponent";
import AdminProductComponent from "../../Pages/AdminComponent/components/AdminProduct/AdminProductComponent/AdminProductComponent";
import AdminPromotionComponent from "../../Pages/AdminComponent/components/AdminPromotion/AdminPromotionComponent/AdminPromotionComponent";
import AdminUnitShipComponent from "../../Pages/AdminComponent/components/AdminUnitShip/AdminUnitShipComponent/AdminUnitShipComponent";
import AdminUserComponent from "../../Pages/AdminComponent/components/AdminUser/AdminUserComponent/AdminUserComponent";
import Forgotpassword from "../../Pages/AuthenticateComponent/ForgotPassword/forgotpassword";
import Register from "../../Pages/AuthenticateComponent/Register/Register";
import CartComponent from "../../Pages/ShopComponent/components/CartComponent/CartComponent";
import CheckoutComponent from "../../Pages/ShopComponent/components/CheckoutComponent/CheckoutComponent";
import HomeComponent from "../../Pages/ShopComponent/components/HomeComponent/HomeComponent";
import PaymentComponent from "../../Pages/ShopComponent/components/PaymentComponent/PaymentComponent";
import ProductDetailComponent from "../../Pages/ShopComponent/components/ProductDetailComponent/ProductDetailComponent";
import ProfileComponent from "../../Pages/ShopComponent/components/ProfileComponent/ProfileComponent";




interface RouteConfig{
    path:string;
    element: React.ReactNode;
    children?:RouteConfig[];
}

const routes: RouteConfig[]=[

      //Admin
      {path: '/admin/product',element: <AdminProductComponent />,},
      {path: '/admin/account',element: <AdminAccountComponent />,},
      {path: '/admin/category', element: <AdminCategoryComponent />,},
      {path: '/admin/membercard',element: <AdminMemberCardComponent />,},
      {path: '/admin/order',element: <AdminOrderComponent />,},
      {path: '/admin/promotion',element: <AdminPromotionComponent />,},
      {path: '/admin/unitship', element: <AdminUnitShipComponent />,},
      {path: '/admin/user', element: <AdminUserComponent />,},
    //////

      ////Customer
      {path: '/home',element:<HomeComponent/>},
      {path:'productdetail/:product',element:<ProductDetailComponent/>},
      //{path:'/login',element:<Login/>},
      {path:'/forgot',element:<Forgotpassword/>},
      {path:'/register',element:<Register/>},
      {path:'/profile',element:<ProfileComponent/>},
      {path:'/cart',element:<CartComponent/>},
      {path:'/checkout',element:<CheckoutComponent/>},
      {path:'/payment/:method',element:<PaymentComponent/>},
      
      
     
      

]
export default routes