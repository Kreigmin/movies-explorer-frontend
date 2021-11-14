import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { Route, Switch } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  visible,
  loadMore,
  isSubmitting,
  onDeleteMovie,
  onHandleBookmark,
  savedMovies,
  isThereSortetMovies,
  isThereSortedSavedMovies,
}) {
  return (
    <section className="cards">
      <div className="container">
        <Switch>
          <Route exact path="/movies">
            {isSubmitting ? (
              <Preloader />
            ) : movies.length !== 0 ? (
              <ul className="cards__list">
                {movies.slice(0, visible).map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    movie={movie}
                    movies={movies}
                    onHandleBookmark={onHandleBookmark}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            ) : isThereSortetMovies ? (
              <></>
            ) : (
              <p className="cards__nothing-found-text">Ничего не найдено</p>
            )}
            {visible < movies.length && (
              <button
                className="cards__more-btn"
                type="button"
                onClick={loadMore}
              >
                Ещё
              </button>
            )}
          </Route>
          <Route path="/saved-movies">
            {isSubmitting ? (
              <Preloader />
            ) : movies.length !== 0 ? (
              <ul className="cards__list">
                {movies.map((movie) => (
                  <MoviesCard
                    key={movie.id}
                    id={movie.id}
                    movie={movie}
                    onDeleteMovie={onDeleteMovie}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            ) : isThereSortedSavedMovies ? (
              <></>
            ) : (
              <p className="cards__nothing-found-text">Ничего не найдено</p>
            )}
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default MoviesCardList;
