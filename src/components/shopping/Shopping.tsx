import styles from "./Shopping.module.css";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import ProductCard from "./ProductCard";
import { useTheme } from "../../context/ThemeContext";

function ProductsPager() {
  return (
    <div className={styles.productsPager}>
      {Array.from(Array(5)).map((_, i) => (
        <ProductCard key={i} title={`Product #${i + 1}`} />
      ))}
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
