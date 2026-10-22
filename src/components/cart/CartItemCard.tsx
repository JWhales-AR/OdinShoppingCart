import styles from "./Cart.module.css";
import type { ProductStoredType } from "./CartStorage";
import { ProductQuantityInput } from "../shopping/ProductCard";
import { useState } from "react";
import CartStorage from "./CartStorage";

export default function CartItemCard({ item }: { item: ProductStoredType }) {
  const fixNumber = (x: number) =>
    isNaN(x) ? 1 : Math.max(1, Math.min(x, 999));

  const [quantity, _setQuantity] = useState<number>(item.quantity);
  const setQuantity = (num: number) => {
    _setQuantity(fixNumber(num));
  };
  const incrQuantity = () => {};

  return (
    <div className={styles.cartItemCard}>
      <p>{item.title}</p>
      <div className={styles.cartItemCardButtonsContainer}>
        <ProductQuantityInput
          quantity={quantity}
          setQuantity={setQuantity}
          incrQuantity={incrQuantity}
        />
        <button
          className={styles.removeButton}
          onClick={() => {
            new CartStorage().removeProduct(item.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
