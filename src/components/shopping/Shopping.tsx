import styles from "./Shopping.module.css";
import NavBar from "../common/NavBar";
import Footer from "../common/Footer";
import { useTheme } from "../../context/ThemeContext";

type ProductCardProps = { title: string };
function ProductCard({ title }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <p>{title}</p>
      <p>
        Justo, laoreet sit amet cursus sit amet, dictum sit amet justo donec
        enim diam, vulputate ut. Blandit volutpat maecenas volutpat blandit
        aliquam etiam erat velit, scelerisque in dictum non, consectetur.
      </p>
    </div>
  );
}

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
