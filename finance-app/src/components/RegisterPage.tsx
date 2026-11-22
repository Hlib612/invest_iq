import React, { useState } from "react";
import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/login-page.module.scss";
import googleImg from "../assets/loginimg/google.svg";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { register } from '@/features/auth/authSlice';

interface IProps {
  setRegistering?: Dispatch<SetStateAction<boolean>>;
}

const RegisterPage = ({setRegistering}: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@") || password.length < 8 || userName.length === 0) {
      alert("Check your email and password")
      return;
    }

    try {
      await dispatch(register({ name: userName, email, password })).unwrap();
      navigate('/dashboard', { replace: true });
    } catch {
//no catch
    }
  };

  const handleLoginClick = () => {
    if (setRegistering) {
      setRegistering(false);
    } else {
      navigate('/login');
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
          Або реєстрація за допомогою ел. пошти та паролю
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <p className={styles.form__text}>Ім'я:</p>
          <input
            type="text"
            required
            value={userName}
            placeholder="name"
            className={styles.login__input}
            onChange={(e) => setUserName(e.target.value)}
          />
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
            minLength={8}
            className={styles.login__input}
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className={styles.login__error}>{error}</p>}

          <div className={styles.btn__wrapper}>
            <button type="button" className={styles.reg__btn} onClick={handleLoginClick}>
              увійти
            </button>
            <button className={styles.login__btn} type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Реєстрація...' : 'реєстрація'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
