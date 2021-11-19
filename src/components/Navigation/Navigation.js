import React from "react";
import { Link } from "react-router-dom";

function Navigation({ isBurgerBtnClicked, onClose }) {
  return (
    <div className={`popup ${isBurgerBtnClicked ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn" onClick={onClose}></button>
        <ul className="popup__menu-list">
          <li className="popup__menu-list-item">
            <Link className="popup__menu-list-link" to="/" onClick={onClose}>
              Главная
            </Link>
          </li>
          <li className="popup__menu-list-item">
            <Link
              className="popup__menu-list-link"
              to="/movies"
              onClick={onClose}
            >
              Фильмы
            </Link>
          </li>
          <li className="popup__menu-list-item">
            <Link
              className="popup__menu-list-link"
              to="/saved-movies"
              onClick={onClose}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="popup__account-btn-container">
          <Link className="popup__account-btn" to="/profile" onClick={onClose}>
            Аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
