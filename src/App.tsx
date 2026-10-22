import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { useTheme } from "./context/ThemeContext";
import { Outlet } from "react-router";
import { useState } from "react";

export type CartItemContextType = {
  cartItemCount: number;
  incrCartItemCount: (arg0: number) => void;
};

export default function App() {
  const { isDarkMode } = useTheme();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
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
