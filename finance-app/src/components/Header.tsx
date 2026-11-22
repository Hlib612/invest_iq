import { Link, NavLink} from "react-router-dom";
import { useState } from "react";
import logo from "../assets/loginimg/logo.svg";
import styles from "../styles/header.module.scss"
import { useAppSelector } from "@/app/hooks";
import { PATHS } from "@/routes/paths";
import { LogoutModal } from "./Modal/LogOutModal";

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const registeredUser = useAppSelector((state) => state.auth.user);

  return (
    <>
      <header className={styles.header}>
        <Link to={PATHS.dashboard} aria-label="InvestIQ dashboard">
          <img src={logo} alt="InvestIQ" />
        </Link>

        <nav className={styles.navigation} aria-label="Головна навігація">
          <NavLink to={PATHS.dashboard}>Головна</NavLink>
          <NavLink to={PATHS.reports}>Звіти</NavLink>
        </nav>

        <div className={styles.side__user}>
          <div className={styles.user__wrapper}>
            <div className={styles.user__img}>U</div>
            {registeredUser?.name || "User name"}
          </div>
        
          <div className={styles.line}></div>
          <button
            className={styles.logoutButton}
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
          >
            вийти
          </button>
        </div>
      </header>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
};

export default Header;