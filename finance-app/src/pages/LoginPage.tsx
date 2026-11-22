import React, { useState } from "react";
import styles from "../styles/login-page.module.scss";
import googleImg from "../assets/loginimg/google.svg";
// import { useNavigate } from "react-router-dom";

interface RegisteredUser {
  email: string;
  password: string;
}

interface IProps {
  setRegistering: any;
}

const LoginPage = ({setRegistering}: IProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registeredUser] = useState<RegisteredUser | null>(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return null;
    try {
      return JSON.parse(saved) as RegisteredUser;
    } catch {
      return null;
    }
  });

  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !registeredUser ||
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {
      alert("Невірна електронна пошта або пароль");
      return;
    }

    alert("Вхід виконано успішно!");
// navigate("/dashboard")
  };

  const handleRegisterClick = () => {
setRegistering(true);
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
        <button type="button" className={styles.login__google__btn}>
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

          <div className={styles.btn__wrapper}>
            <button type="submit" className={styles.login__btn}>
              увійти
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
