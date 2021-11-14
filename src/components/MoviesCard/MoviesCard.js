import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

function MoviesCard({ movie, onDeleteMovie, onHandleBookmark, savedMovies }) {
  const [isLiked, setIsLiked] = useState(false);

  const isBookmark = savedMovies.some((i) => i.nameRU === movie.nameRU);

  const cardBookmarkClassName = `movies-card__bookmark ${
    isBookmark || isLiked
      ? "movies-card__bookmark_state_active"
      : "movies-card__bookmark_state_inactive"
  }`;

  function timeConvert(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return hours + "ч " + minutes + "м";
  }

  function handleMovieBookmark() {
    if (isBookmark) {
      setIsLiked(false);
    } else {
      setIsLiked(!isLiked);
    }
    onHandleBookmark(movie);
  }

  function handleMovieDelete() {
    onDeleteMovie(movie._id);
  }

  return (
    <li className="movies-card">
      <Switch>
        <Route exact path="/movies">
          <div className="movies-card__top">
            <div className="movies-card__description">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className="movies-card__duration">
                {timeConvert(movie.duration)}
              </p>
            </div>

            <button
              className={cardBookmarkClassName}
              type="button"
              onClick={handleMovieBookmark}
            ></button>
          </div>
          <a
            className="movies-card__trailer-link"
            href={movie.trailerLink}
            target="_blank"
          >
            <img
              className="movies-card__img"
              src={`https://api.nomoreparties.co${movie.image.url}`}
              alt={movie.nameRU}
            />
          </a>
        </Route>
        <Route path="/saved-movies">
          <div className="movies-card__top">
            <div className="movies-card__description">
              <h2 className="movies-card__title">{movie.nameRU}</h2>
              <p className="movies-card__duration">
                {timeConvert(movie.duration)}
              </p>
            </div>
            <button
              className="movies-card__delete-btn"
              type="button"
              onClick={handleMovieDelete}
            >
              &times;
            </button>
          </div>
          <a
            className="movies-card__trailer-link"
            href={movie.trailerLink}
            target="_blank"
          >
            <img
              className="movies-card__img"
              src={movie.image}
              alt={movie.nameRU}
            />
          </a>
        </Route>
      </Switch>
    </li>
  );
}

export default MoviesCard;
