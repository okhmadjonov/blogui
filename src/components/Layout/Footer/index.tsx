import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.footer_authoryear}>
        © The Montessori Method Community, {year}
      </div>
    </div>
  );
};

export default Footer;
