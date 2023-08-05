import { Link } from 'react-router-dom';
import { AppRoute } from '../../config';

import Logo from '../../components/logo/logo';

function Page404(): JSX.Element {
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
            <h1 className="login__title">404 Error</h1>
            <p>Вы обращаетесь к несущствующей странице</p>
            <Link className="form__submit button" to={AppRoute.Main}>Вернуться на главную</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page404;
