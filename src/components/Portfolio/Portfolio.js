import React from "react";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://kreigmin.github.io/how-to-learn/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-link-text">Статичный сайт</p>
            <span className="portfolio__list-link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://kreigmin.github.io/russian-travel/index.html"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-link-text">Адаптивный сайт</p>
            <span className="portfolio__list-link-arrow">&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-link"
            href="https://beautiful-places.nomoredomains.club"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__list-link-text">
              Одностраничное приложение
            </p>
            <span className="portfolio__list-link-arrow">&#8599;</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
