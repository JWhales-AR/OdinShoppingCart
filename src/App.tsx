import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { useTheme } from "./context/ThemeContext";
import { Outlet } from "react-router";
import { useState } from "react";
import CartStorage from "./components/cart/CartStorage";

export type CartItemContextType = {
  cartItemCount: number;
  incrCartItemCount: (arg0: number) => void;
};

export default function App() {
  const { isDarkMode } = useTheme();
  const cartStoredItemCount = new CartStorage()
    .getProductsInCart()
    .reduce((acc, currItem) => acc + currItem.quantity, 0);
  const [cartItemCount, setCartItemCount] =
    useState<number>(cartStoredItemCount);
  const incrCartItemCount = (incr: number) =>
    setCartItemCount((prev) => prev + incr);

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <NavBar cartItemCount={cartItemCount} />
      <Outlet
        context={
          { cartItemCount, incrCartItemCount } satisfies CartItemContextType
        }
      />
      <Footer />
    </div>
  );
}
