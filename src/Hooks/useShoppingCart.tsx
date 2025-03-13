import { useContext } from "react";
import { CartShoppingContext } from "../Features/Context/CartShoppingContext"; // Đảm bảo đường dẫn chính xác

export function useShoppingCart() {
  return useContext(CartShoppingContext);
}