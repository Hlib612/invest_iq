import React, { useState } from "react";
import type { Dispatch, SetStateAction } from 'react';
import styles from "../styles/login-page.module.scss";
import googleImg from "../assets/loginimg/google.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login } from '@/features/auth/authSlice';

interface IProps {
setRegistering?: Dispatch<SetStateAction<boolean>>;
}

const LoginPage = ({setRegistering}: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      const state = location.state as { from?: { pathname?: string } } | null;
      navigate(state?.from?.pathname || "/dashboard", { replace: true });
    } catch {
  //state
    }
  };

  const handleRegisterClick = () => {
    if (setRegistering) {
      setRegistering(true);
    } else {
      navigate('/register', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title__wrapper}>
        <h1 className={styles.login__title}>InvestIQ</h1>
        <p className={styles.login__subtitle}>Smart Finance</p>
      </div>

      <div className={styles.login__container}>
        <p className={styles.login__explaining__text}>
          Ви можете авторизуватися за допомогою акаунта Google
        </p>
        <button type="button" className={styles.login__google__btn} onClick={() => alert("Oops")}>
          <img src={googleImg} alt="Google" /> Google
        </button>

        <p className={styles.login__explaining__text}>
          Або увійти за допомогою ел. пошти та паролю після реєстрації
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.form__text}>Електронна пошта:</p>
          <input
            type="email"
            required
            value={email}
            placeholder="your@email.com"
            className={styles.login__input}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className={styles.form__text}>Пароль:</p>
          <input
            type="password"
            required
            value={password}
            placeholder="••••••••"
            className={styles.login__input}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.login__error}>{error}</p>}

          <div className={styles.btn__wrapper}>
            <button
              type="submit"
              className={styles.login__btn}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Вхід...' : 'увійти'}
            </button>
            <button
              type="button"
              className={styles.reg__btn}
              onClick={handleRegisterClick}
            >
              реєстрація
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
