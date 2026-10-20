import styles from "./App.module.css";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import { useTheme } from "./context/ThemeContext";
import { Link } from "react-router";

function ShoppingRedirectLink() {
  return (
    <Link className={styles.heroShoppingRedirectLink} to="/shopping">
      Shop Now
    </Link>
  );
}

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroBannerContainer}>
        <p>THE FAKE MARKET</p>
        <p>The single stop for none of your wants</p>
        <ShoppingRedirectLink />
      </div>
      <div className={styles.heroBgImage}></div>
    </div>
  );
}

export default function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode && "dark"}`}>
      <NavBar />
      <Hero />
      <Footer />
    </div>
  );
}
