import React, { useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  let location = useLocation();

  function handleBurgerBtnClick() {
    setIsClicked(true);
  }

  function reloadPage() {
    window.location.reload(false);
  }

  function closePopup() {
    setIsClicked(false);
  }

  return (
    <Switch>
      <Route exact path="/">
        <header className="header">
          <div className="header__container">
            <Link to="/" className="header__logo"></Link>
            <nav className="header__auth-nav">
              <Link to="signup" className="header__nav-register-btn">
                Регистрация
              </Link>
              <Link to="signin" className="header__nav-login-btn">
                Войти
              </Link>
            </nav>
          </div>
        </header>
      </Route>
      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header header_bg-color_black">
          <div className="header__container">
            <Link
              to={location.pathname}
              className="header__logo"
              onClick={reloadPage}
            ></Link>
            <button
              className="header__burger-menu-btn"
              type="button"
              onClick={handleBurgerBtnClick}
            ></button>
            <nav className="header__main-nav">
              <Link to="/movies" className="header__nav-movies-link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__nav-movies-link">
                Сохранённые фильмы
              </Link>
            </nav>
            <Link to="/profile" className="header__account-btn">
              Аккаунт
            </Link>
          </div>
          <Navigation isBurgerBtnClicked={isClicked} onClose={closePopup} />
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
