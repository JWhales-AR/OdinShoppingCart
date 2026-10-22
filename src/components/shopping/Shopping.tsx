import styles from "./Shopping.module.css";
import ProductCard from "./ProductCard";
import { useTheme } from "../../context/ThemeContext";
import useFakeStoreProducts from "./FakeStore";

function ProductsPager() {
  const { loading, products } = useFakeStoreProducts();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading Products, Please Wait</p>
      </div>
    );
  }

  return (
    <div className={styles.productsPager}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Shopping() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <ProductsPager />
    </div>
  );
}
