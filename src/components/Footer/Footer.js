import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__copyright">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__bottom">
          <p className="footer__year">&copy; 2021</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a
                href="https://practicum.yandex.ru/"
                className="footer__list-link"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a
                href="https://github.com/Kreigmin"
                className="footer__list-link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__list-item">
              <a
                href="https://www.facebook.com/"
                className="footer__list-link"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
