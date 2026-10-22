import styles from "./Shopping.module.css";
import ChandelierImg from "../../assets/chandelier-pexels.jpg";
import { useState, type ChangeEventHandler } from "react";
import type { CartItemContextType } from "../../App";
import CartStorage from "../cart/CartStorage";
import { useOutletContext } from "react-router";

interface ProductQuantityProps {
  quantity: number;
  setQuantity: (arg0: number) => void;
  incrQuantity: (arg0: -1 | 1) => void;
}
export function ProductQuantityInput({
  quantity,
  setQuantity,
  incrQuantity,
}: ProductQuantityProps) {
  const handleChange: ChangeEventHandler = (e) => {
    const newValue = Number((e.target as HTMLTextAreaElement).value);
    setQuantity(newValue);
  };

  return (
    <div className={styles.productQuantityInputContainer}>
      <button
        aria-label="cart-decrement"
        className={styles.productQuantityDecrButton}
        onClick={() => incrQuantity(-1)}
      >
        -
      </button>
      <input
        aria-label="product-quantity"
        type="text"
        className={styles.productQuantityInput}
        value={quantity}
        onChange={handleChange}
      ></input>
      <button
        aria-label="cart-increment"
        className={styles.productQuantityIncrButton}
        onClick={() => incrQuantity(1)}
      >
        +
      </button>
    </div>
  );
}

interface ProductAddToCartProps extends ProductQuantityProps {
  product: ProductType;
}
function ProductAddToCart({
  product,
  quantity,
  setQuantity,
}: ProductAddToCartProps) {
  const { incrCartItemCount } = useOutletContext<CartItemContextType>();
  return (
    <button
      className={styles.addToCartButton}
      onClick={() => {
        incrCartItemCount(quantity);
        new CartStorage().addProduct({ ...product, quantity }, true);
        setQuantity(1);
      }}
    >
      Add to Cart
    </button>
  );
}

export interface ProductType {
  id: number;
  title: string;
  imgSrc?: string;
  category: string;
  description: string;
  price: number;
}
export default function ProductCard({ product }: { product: ProductType }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const fixNumber = (x: number) =>
    isNaN(x) ? 1 : Math.max(1, Math.min(x, 999));

  const [quantity, _setQuantity] = useState<number>(1);
  const setQuantity = (num: number) => {
    _setQuantity(fixNumber(num));
  };
  const incrQuantity = (incr: -1 | 1) => {
    _setQuantity((prev) => fixNumber(prev + incr));
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productDisplayContainer}>
        <img
          className={styles.productImage}
          src={product.imgSrc ?? ChandelierImg}
          alt={`Product ${product.title} Image`}
        ></img>
        <p className={styles.productCategory}>{product.category}</p>
      </div>
      <div className={styles.productAboutContainer}>
        <p className={styles.productAboutTitle}>{product.title}</p>
        <p className={styles.productAboutDescription}>{product.description}</p>
      </div>
      <div className={styles.productPriceCartContainer}>
        <p>{formattedPrice}</p>
        <div className={styles.productCartControlContainer}>
          <ProductQuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            incrQuantity={incrQuantity}
          />
          <ProductAddToCart
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            incrQuantity={incrQuantity}
          />
        </div>
      </div>
    </div>
  );
}
