import styles from "./NavBar.module.css";
import SearchSvg from "../../assets/search.svg?react";
import ShoppingCartSvg from "../../assets/shopping-cart.svg?react";
import HomeSvg from "../../assets/home.svg?react";
import Logo from "./Logo";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router";

export default function NavBar({
  cartItemCount = 0,
}: {
  cartItemCount?: number;
}) {
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
            <Link aria-label="nav-home-page" to="/">
              <HomeSvg />
            </Link>
          </li>
          <li className={styles.navbarLinkItem}>
            <Link aria-label="nav-shop-page" to="/shopping">
              <SearchSvg />
            </Link>
          </li>
          <li className={styles.navbarLinkItem}>
            <div className={styles.navbarCartLinkWrapper}>
              <Link aria-label="nav-cart-page" to="/cart">
                <ShoppingCartSvg />
              </Link>
              <p className={styles.navbarCartItemCount}>{cartItemCount}</p>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
