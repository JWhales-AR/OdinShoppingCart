import styles from "./NavBar.module.css";
import SearchSvg from "../../assets/search.svg?react";
import ShoppingCartSvg from "../../assets/shopping-cart.svg?react";
import HomeSvg from "../../assets/home.svg?react";
import Logo from "./Logo";
import { useTheme } from "../../context/ThemeContext";

export default function NavBar() {
  const { toggleTheme } = useTheme();

  return (
    <header id="navbar" className={`${styles.navbar}`}>
      <button
        className={styles.navbarLogoThemeToggleButton}
        onClick={toggleTheme}
      >
        <Logo />
      </button>
      <nav>
        <ul className={styles.navbarLinkList}>
          <li className={styles.navbarLinkItem}>
            <HomeSvg />
          </li>
          <li className={styles.navbarLinkItem}>
            <SearchSvg />
          </li>
          <li className={styles.navbarLinkItem}>
            <ShoppingCartSvg />
          </li>
        </ul>
      </nav>
    </header>
  );
}
