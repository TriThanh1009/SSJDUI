/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useEffect, useState } from "react";
import { OrderDetailModel } from "../../Model/OrderDetail/OrderDetailModel";


type CardProps = {
  children: ReactNode;
};

type CartContextType = {

  getItemQuantity: (productID: string) => number;
  increaseCartQuantity: (productID: string,headType: string) => void;
  decreaseCartQuantity: (productID: string,headType: string) => void;
  removeFromCart: (productID: string,headType: string) => void;
  cartQuantity: number;
  cart: OrderDetailModel[];
};

// Tạo Context
export const CartShoppingContext = createContext({} as CartContextType);

// Định nghĩa Provider
export function CartProvider({ children }: CardProps) {
  const [cart, setCart] = useState<OrderDetailModel[]>(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  

  const cartQuantity = cart.reduce((quantity, item) => item.quantity + quantity, 0);


  function getItemQuantity(productId: string) {
    return cart.find((item) => item.productID === productId)?.quantity || 0;
  }

  function increaseCartQuantity(productID: string, headType: string) {
    setCart((currItems) => {
      if (currItems.find((item) => item.productID === productID && item.headType === headType) == null) {
        return [...currItems, { productID, headType, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.productID === productID && item.headType === headType) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  
  
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));

  }, [cart]);
  
  function decreaseCartQuantity(productID: string , headType: string) {
    setCart((currItems) => {
      if (currItems.find((item) => item.productID === productID && item.headType === headType)?.quantity === 1) {
        return currItems.filter((item) => !(item.productID === productID && item.headType === headType));
      } else {
        return currItems.map((item) => {
          if (item.productID === productID && item.headType === headType) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  
  

  function removeFromCart(productID: string, headType: string) {
    setCart((currItems) => currItems.filter((item) => !(item.productID === productID && item.headType === headType)));
  }
 
  

  return (
    <CartShoppingContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cart,
        cartQuantity,
      }}
    >
      {children}
    </CartShoppingContext.Provider>
  );
}
