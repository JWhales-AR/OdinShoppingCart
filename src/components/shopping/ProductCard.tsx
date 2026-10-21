import styles from "./Shopping.module.css";
import ChandelierImg from "../../assets/chandelier-pexels.jpg";

function ProductQuantityInput() {
  return (
    <input
      type="number"
      min={0}
      max={999}
      defaultValue={0}
      className={styles.productQuantityInput}
    ></input>
  );
}

function ProductAddToCart() {
  return <button className={styles.addToCartButton}>Add to Cart</button>;
}

type ProductCardProps = { title: string };
export default function ProductCard({ title }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productDisplayContainer}>
        <img
          className={styles.productImage}
          src={ChandelierImg}
          alt={`Product ${title} Image`}
        ></img>
        <p className={styles.productCategory}>Product Category</p>
      </div>
      <div className={styles.productAboutContainer}>
        <p className={styles.productAboutTitle}>{title}</p>
        <p className={styles.productAboutDescription}>
          Justo, laoreet sit amet cursus sit amet, dictum sit amet justo donec
          enim diam, vulputate ut. Blandit volutpat maecenas volutpat blandit
          aliquam etiam erat velit, scelerisque in dictum non, consectetur.
        </p>
      </div>
      <div className={styles.productPriceCartContainer}>
        <p>$69,999</p>
        <div className={styles.productCartControlContainer}>
          <ProductQuantityInput />
          <ProductAddToCart />
        </div>
      </div>
    </div>
  );
}
