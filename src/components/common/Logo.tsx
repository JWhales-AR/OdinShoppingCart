import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <p id="navbar-logo">
      <span className={styles.logoLight}>ROSE</span>
      <span className={styles.logoBold}>GRID</span>
      <span className={styles.logoLight}>AL</span>
      <span className={styles.logoBold}>EX</span>
    </p>
  );
}
