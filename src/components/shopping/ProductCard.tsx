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
          <ProductQuantityInput />
          <ProductAddToCart />
        </div>
      </div>
    </div>
  );
}
