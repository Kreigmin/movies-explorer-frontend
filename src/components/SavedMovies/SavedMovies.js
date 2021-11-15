import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  savedMovies,
  onDeleteMovie,
  setSavedMoviesSearchText,
  onRenderLoading,
  onChecked,
  onSavedMoviesSearchFormSubmit,
  onCheckedSavedMovies,
  isCheckedSavedMovies,
  isThereSortedSavedMovies,
  isSubmitting,
  loggedIn,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm
          setSavedMoviesSearchText={setSavedMoviesSearchText}
          onRenderLoading={onRenderLoading}
          onChecked={onChecked}
          onSavedMoviesSearchFormSubmit={onSavedMoviesSearchFormSubmit}
          onCheckedSavedMovies={onCheckedSavedMovies}
          isCheckedSavedMovies={isCheckedSavedMovies}
        />
        <MoviesCardList
          movies={savedMovies}
          onDeleteMovie={onDeleteMovie}
          savedMovies={savedMovies}
          isThereSortedSavedMovies={isThereSortedSavedMovies}
          isSubmitting={isSubmitting}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
