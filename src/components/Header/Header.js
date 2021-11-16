import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();

  const headerClassName = `header ${
    location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile"
      ? "header_bg-color_black"
      : "header_bg-color_dark-blue"
  }`;

  function handleBurgerBtnClick() {
    setIsClicked(true);
  }

  function closePopup() {
    setIsClicked(false);
  }

  return (
    <header className={headerClassName}>
      <div className="header__container">
        {loggedIn ? (
          <>
            <Link to="/" className="header__logo"></Link>
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
          </>
        ) : (
          <>
            <Link to="/" className="header__logo"></Link>
            <nav className="header__auth-nav">
              <Link to="signup" className="header__nav-register-btn">
                Регистрация
              </Link>
              <Link to="signin" className="header__nav-login-btn">
                Войти
              </Link>
            </nav>
          </>
        )}
      </div>
      <Navigation isBurgerBtnClicked={isClicked} onClose={closePopup} />
    </header>
  );
}

export default Header;
