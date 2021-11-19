import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm({
  onChecked,
  onSearchText,
  onRenderLoading,
  onCheckedSavedMovies,
  isChecked,
  isCheckedSavedMovies,
  setSavedMoviesSearchText,
}) {
  const [text, setText] = useState("");
  const [errorClassName, setErrorClassName] = useState(
    "form__input-error text-input-error"
  );

  const location = useLocation();

  function handleTextChange(evt) {
    setText(evt.target.value);
  }

  function handleSubmit(searchTextFnc) {
    onRenderLoading(true);
    if (!text) {
      return setErrorClassName(errorClassName + " form__input-error_active");
    } else {
      searchTextFnc(text);
      setTimeout(() => {
        onRenderLoading(false);
      }, 300);
      return setErrorClassName("form__input-error text-input-error");
    }
  }

  function handleMoviesSubmit(evt) {
    evt.preventDefault();
    handleSubmit(onSearchText);
  }

  function handleSavedMoviesFilterSubmit(evt) {
    evt.preventDefault();
    handleSubmit(setSavedMoviesSearchText);
  }

  return (
    <section className="search-form">
      <div className="container">
        {location.pathname === "/movies" ? (
          <form className="form" onSubmit={handleMoviesSubmit}>
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
            <span className={errorClassName}>Нужно ввести ключевое слово</span>
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
        ) : (
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
            <span className={errorClassName}>Нужно ввести ключевое слово</span>
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
        )}
      </div>
    </section>
  );
}

export default SearchForm;
