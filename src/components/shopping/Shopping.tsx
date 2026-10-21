import styles from "./Shopping.module.css";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import ProductCard, { type ProductType } from "./ProductCard";
import { useTheme } from "../../context/ThemeContext";

function ProductsPager() {
  return (
    <div className={styles.productsPager}>
      {Array.from(Array(5)).map((_, i) => {
        const product: ProductType = {
          title: `Product #${i + 1}`,
          category: "Product Category",
          description:
            "Justo, laoreet sit amet cursus sit amet, dictum sit amet justo donec" +
            "enim diam, vulputate ut. Blandit volutpat maecenas volutpat",
          price: 69999,
        };

        return <ProductCard key={i} product={product} />;
      })}
    </div>
  );
}

export default function Shopping() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <NavBar />
      <ProductsPager />
      <Footer />
    </div>
  );
}
