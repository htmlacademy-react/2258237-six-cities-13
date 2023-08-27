import { FormEvent, MouseEventHandler, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { loginAction } from '../../store/api-action';
import { AppRoute } from '../../config';
import { changeActiveCity } from '../../store/action';

import Logo from '../../components/logo/logo';
import { locations } from '../../mocks/locations';

import styles from './login.module.css';


function LoginPage(): JSX.Element {
  const city = [...locations][Math.floor(Math.random() * [...locations].length)];

  const regexLogin = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z]/;
  const regexPassword = /^(?=.*\d)(?=.*[a-z]).*$/;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsCorrectLogin(true);
    setIsCorrectPassword(true);


    if (loginRef.current && passwordRef.current) {

      if (loginRef.current.value === '' || passwordRef.current.value === '') {
        setIsCorrectLogin(false);
        setIsCorrectPassword(false);
        return;
      }

      if (!regexLogin.test(loginRef.current.value.trim())) {
        setIsCorrectLogin(false);
        return;
      }

      if (!regexPassword.test(passwordRef.current.value.trim())) {
        setIsCorrectPassword(false);
        return;
      }

      dispatch(loginAction({
        login: loginRef.current.value.trim(),
        password: passwordRef.current.value.trim(),
      }));

      navigate(AppRoute.Main);
    }
  };

  const handleButtonClick: MouseEventHandler<HTMLAnchorElement> = () => {
    dispatch(changeActiveCity({city}));
  };


  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {
                  !isCorrectLogin &&
                  <p className={styles.error}>Enter a valid email</p>
                }
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {
                  !isCorrectPassword &&
                  <p className={styles.error}>At least 1 letter and 1 number without spaces</p>
                }
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleButtonClick}>
                <span>
                  {city}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
