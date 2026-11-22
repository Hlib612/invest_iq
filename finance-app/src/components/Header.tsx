import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/loginimg/logo.svg";
import styles from "../styles/header.module.scss"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import { PATHS } from "@/routes/paths";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registeredUser = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATHS.login, { replace: true });
  };

  return (
    <header className={styles.header}>
      <Link to={PATHS.dashboard} aria-label="InvestIQ dashboard">
        <img src={logo} alt="InvestIQ" />
      </Link>


      <div className={styles.side__user}>
        <div className={styles.user__wrapper}>
              <div className={styles.user__img}>
            U
        </div>
        {registeredUser?.name || "User name"}
        </div>
      
<div className={styles.line}></div>
        <button type="button" onClick={handleLogout}>вийти</button>
      </div>
    </header>
  );
};

export default Header;