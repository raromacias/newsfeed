import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span className={styles.name}>
        Daily News made by -{" "}
        <a href="https://www.linkedin.com/in/gerardo-macias-2a912131/" target="__blank">
          Gerardo Macias
        </a>
      </span>
      <hr style={{ width: "90%" }} />
      <div className={styles.iconContainer}>
        <a href="https://www.linkedin.com/in/gerardo-macias-2a912131/" target="__blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://github.com/raromacias" target="__blank">
        <i class="fa-brands fa-square-github"></i>
        </a>
      </div>
    </div>
  )
};

export default Footer;