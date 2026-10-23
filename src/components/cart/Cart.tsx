import { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import CartItemCard from "./CartItemCard";
import CartStorage, { type ProductStoredType } from "./CartStorage";

export default function Cart() {
  const [cartItems, setCartItems] = useState<ProductStoredType[]>([]);
  useEffect(() => {
    const updateCartItems = () => {
      setCartItems(new CartStorage().getProductsInCart());
    };
    updateCartItems();
  }, []);
  const removeCartItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    new CartStorage().removeProduct(itemId);
  };

  if (cartItems.length === 0)
    return <div className={styles.cartPager}>No items in cart</div>;
  return (
    <div className={styles.cartPager}>
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          removeCartItem={removeCartItem}
        />
      ))}
    </div>
  );
}
