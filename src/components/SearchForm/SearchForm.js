import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

function SearchForm({
  onSearchFormSubmit,
  onChecked,
  onSearchText,
  onRenderLoading,
  onSavedMoviesSearchFormSubmit,
  onCheckedSavedMovies,
  isChecked,
  isCheckedSavedMovies,
  setSavedMoviesSearchText,
}) {
  const [text, setText] = useState("");
  const [errorClassName, setErrorClassName] = useState(
    "form__input-error text-input-error"
  );

  function handleTextChange(evt) {
    setText(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRenderLoading(true);
    if (!text) {
      return setErrorClassName(errorClassName + " form__input-error_active");
    } else {
      onSearchText(text);
      onSearchFormSubmit();
      return setErrorClassName("form__input-error text-input-error");
    }
  }

  function handleSavedMoviesFilterSubmit(evt) {
    evt.preventDefault();
    onRenderLoading(true);
    if (!text) {
      return setErrorClassName(errorClassName + " form__input-error_active");
    } else {
      setSavedMoviesSearchText(text);
      onSavedMoviesSearchFormSubmit();
      return setErrorClassName("form__input-error text-input-error");
    }
  }

  return (
    <section className="search-form">
      <div className="container">
        <Switch>
          <Route exact path="/movies">
            <form className="form" onSubmit={handleSubmit}>
              <fieldset className="form__fieldset">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Фильм"
                  name="searchText"
                  value={text || ""}
                  onChange={handleTextChange}
                />
                <button className="form__submit-btn" type="submit">
                  Найти
                </button>
              </fieldset>
              <span className={errorClassName}>
                Нужно ввести ключевое слово
              </span>
              <fieldset className="form__fieldset">
                <div className="form__checkbox-label">
                  <input
                    className="form__checkbox"
                    type="checkbox"
                    onClick={onChecked}
                    checked={isChecked ? true : false}
                  />
                </div>
                <p className="form__checkbox-name">Короткометражки</p>
              </fieldset>
            </form>
          </Route>
          <Route exact path="/saved-movies">
            <form className="form" onSubmit={handleSavedMoviesFilterSubmit}>
              <fieldset className="form__fieldset">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Фильм"
                  name="searchText"
                  value={text || ""}
                  onChange={handleTextChange}
                />
                <button className="form__submit-btn" type="submit">
                  Найти
                </button>
              </fieldset>
              <span className={errorClassName}>
                Нужно ввести ключевое слово
              </span>
              <fieldset className="form__fieldset">
                <div className="form__checkbox-label">
                  <input
                    className="form__checkbox"
                    type="checkbox"
                    onClick={onCheckedSavedMovies}
                    checked={isCheckedSavedMovies ? true : false}
                  />
                </div>
                <p className="form__checkbox-name">Короткометражки</p>
              </fieldset>
            </form>
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default SearchForm;
