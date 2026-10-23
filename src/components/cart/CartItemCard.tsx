import styles from "./Cart.module.css";
import type { ProductStoredType } from "./CartStorage";
import { ProductQuantityInput } from "../shopping/ProductCard";
import { useState } from "react";
import { useOutletContext } from "react-router";
import type { CartItemContextType } from "../../App";
import CartStorage from "./CartStorage";

type CartItemCardProp = {
  item: ProductStoredType;
  removeCartItem: (arg0: number) => void;
};
export default function CartItemCard({
  item,
  removeCartItem,
}: CartItemCardProp) {
  const { incrCartItemCount } = useOutletContext<CartItemContextType>();

  const fixNumber = (x: number) =>
    isNaN(x) ? 1 : Math.max(1, Math.min(x, 999));

  const [quantity, _setQuantity] = useState<number>(item.quantity);
  const setQuantity = (num: number) => {
    const fixedNumber = fixNumber(num);
    _setQuantity(fixedNumber);
    new CartStorage().addProduct({ ...item, quantity: fixedNumber });
  };
  const incrQuantity = (incr: -1 | 1) => {
    if ((quantity > 1 && incr === -1) || (quantity < 999 && incr === 1)) {
      incrCartItemCount(incr);
      _setQuantity((prev) => prev + incr);
      new CartStorage().addProduct({ ...item, quantity: quantity + incr });
    }
  };

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
            incrCartItemCount(-1 * item.quantity);
            removeCartItem(item.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
