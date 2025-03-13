/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { StrictMode } from "react"; // ✅ Import StrictMode
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AppAdmin from "./AppAdmin";
import Login from "./Pages/AuthenticateComponent/Login/Login";
import { CartProvider } from "./Features/Context/CartShoppingContext";
import { createRoot } from "react-dom/client";
import Register from "./Pages/AuthenticateComponent/Register/Register";
import Forgotpassword from "./Pages/AuthenticateComponent/ForgotPassword/forgotpassword";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
const Main = () => {
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  useEffect(() => {
    if (accessToken) {
      try {
        const decodeToken = jwtDecode<{ [key: string]: any }>(accessToken);
        const getrole = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(getrole);
      } catch (error) {
        console.error("Lỗi khi giải mã token:", error);
        setRole("")
      }
    } else {
      setRole("");
    }
  }, [accessToken]) //Chỉ chạy khi accessToken thay đổi
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };
  
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("accessToken");
      if (newToken !== accessToken) {
        setAccessToken(newToken);
      }
    }, 3000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgotpassword />} />
              {role === "Admin" ? (
              <Route path="*" element={<AppAdmin />} />
            ) : (
              <Route path="*" element={<App />} />
            )}
                  </Routes>
        </CartProvider>
      </BrowserRouter>
    </StrictMode>
  );
};


createRoot(document.getElementById("root")!).render(<Main />);
