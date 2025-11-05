import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.jpg";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>
       <div className={styles.search}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Qidiruv ..."
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.right}>
        <NavLink to="/login" className={styles.auth}>
          Kirish
        </NavLink>
        <NavLink to="/register" className={styles.auth}>
          Ro'yxatdan o'tish
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
