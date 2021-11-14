import React from "react";
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
}) {
  return (
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
  );
}

export default SavedMovies;
