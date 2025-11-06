import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.jpg";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Search for:", searchValue);
      setSearchValue("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleAuthClick = (type: string) => {
    console.log(`${type} clicked`);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContent}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo} onClick={closeMenu}>
            <img src={Logo} alt="Logo" />
          </NavLink>
        </div>

        <div className={styles.center}>
          <form className={styles.search} onSubmit={handleSearchSubmit}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Qidiruv ..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </form>
        </div>

        <div className={styles.right}>
          <NavLink to="/login" className={styles.auth}>
            Kirish
          </NavLink>
          <NavLink to="/register" className={styles.auth}>
            Ro'yxatdan o'tish
          </NavLink>

          <button
            ref={hamburgerRef}
            className={`${styles.mobileMenuButton} ${
              menuOpen ? styles.mobileMenuButton_active : ""
            }`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Yopish" : "Menyuni ochish"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div 
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlay_visible : ""}`}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenu_open : ""
        }`}
      >
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileLogo}>
            <img src={Logo} alt="Logo" />
          </div>
          <button 
            onClick={closeMenu}
            className={styles.mobileCloseButton}
            aria-label="Yopish"
          >
            <FiX />
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          <form className={styles.mobileSearch} onSubmit={handleSearchSubmit}>
            <FiSearch className={styles.mobileSearchIcon} />
            <input
              type="text"
              placeholder="Qidiruv ..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </form>

          <nav className={styles.mobileNav}>
            <div className={styles.mobileAuthSection}>
              <NavLink
                to="/login"
                className={styles.mobileAuth}
                onClick={() => handleAuthClick("login")}
              >
                Kirish
              </NavLink>
              <NavLink
                to="/register"
                className={styles.mobileAuth}
                onClick={() => handleAuthClick("register")}
              >
                Ro'yxatdan o'tish
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;