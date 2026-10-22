import styles from "./Hero.module.css";
import { Link } from "react-router";

function ShoppingRedirectLink() {
  return (
    <Link className={styles.heroShoppingRedirectLink} to="/shopping">
      Shop Now
    </Link>
  );
}

export default function Hero() {
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
