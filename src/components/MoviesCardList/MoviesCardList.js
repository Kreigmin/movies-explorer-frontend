import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route } from "react-router-dom";

function MoviesCardList({ cards }) {
  return (
    <section className="cards">
      <div className="container">
        <div className="preloader"></div>
        <ul className="cards__list">
          {cards.map((card) => (
            <MoviesCard key={card.id} card={card} />
          ))}
        </ul>
        <Route exact path="/movies">
          <button className="cards__more-btn" type="button">
            Ещё
          </button>
        </Route>
      </div>
    </section>
  );
}

export default MoviesCardList;
