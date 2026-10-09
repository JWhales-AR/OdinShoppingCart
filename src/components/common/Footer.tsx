import styles from "./Footer.module.css";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div>
        <p>2026 &copy; All Rights Reserved</p>
        <Logo />
      </div>
    </footer>
  );
}
