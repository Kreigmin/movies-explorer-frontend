import React from "react";
import avatar from "../../images/portfolio-avatar.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <div className="container">
        <h2 className="section-title">Студент</h2>
        <span className="section-line"></span>
        <div className="about-me__container">
          <div className="about-me__text-container">
            <h2 className="about-me__name">Дмитрий</h2>
            <p className="about-me__job">Фронтенд-разработчик, 23 года</p>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <div className="about-me__links">
              <a
                className="about-me__link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
              <a
                className="about-me__link"
                href="https://github.com/Kreigmin"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="portfilo avatar"
          />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
