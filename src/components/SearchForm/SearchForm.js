import React from "react";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="container">
        <form className="form">
          <fieldset className="form__fieldset">
            <input
              className="form__input"
              type="text"
              placeholder="Фильм"
              name="searchText"
            />
            <button className="form__submit-btn" type="submit">
              Найти
            </button>
          </fieldset>
          <fieldset className="form__fieldset">
            <div className="form__checkbox-label">
              <input className="form__checkbox" type="checkbox" />
            </div>
            <p className="form__checkbox-name">Короткометражки</p>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;
