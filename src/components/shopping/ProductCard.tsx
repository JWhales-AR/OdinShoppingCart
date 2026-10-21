import styles from "./Shopping.module.css";
import ChandelierImg from "../../assets/chandelier-pexels.jpg";
import {
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";

type ProductQuantityProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};
function ProductQuantityInput({ quantity, setQuantity }: ProductQuantityProps) {
  const fixNumber = (x: number) =>
    isNaN(x) ? 0 : Math.max(0, Math.min(x, 999));

  const handleChange: ChangeEventHandler = (e) => {
    const newValue = Number((e.target as HTMLTextAreaElement).value);
    setQuantity(fixNumber(newValue));
  };

  return (
    <div className={styles.productQuantityInputContainer}>
      <button
        aria-label="cart-decrement"
        className={styles.productQuantityDecrButton}
        onClick={() => setQuantity((prev) => fixNumber(prev - 1))}
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
        onClick={() => setQuantity((prev) => fixNumber(prev + 1))}
      >
        +
      </button>
    </div>
  );
}

function ProductAddToCart() {
  return <button className={styles.addToCartButton}>Add to Cart</button>;
}

export type ProductType = {
  title: string;
  imgSrc?: string;
  category: string;
  description: string;
  price: number;
};
export default function ProductCard({ product }: { product: ProductType }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className={styles.productCard}>
      <div className={styles.productDisplayContainer}>
        <img
          className={styles.productImage}
          src={product.imgSrc || ChandelierImg}
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
          <ProductQuantityInput quantity={quantity} setQuantity={setQuantity} />
          <ProductAddToCart />
        </div>
      </div>
    </div>
  );
}
