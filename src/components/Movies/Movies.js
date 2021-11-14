import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function Movies({
  onSearchFormSubmit,
  movies,
  visible,
  loadMore,
  isChecked,
  onChecked,
  onSearchText,
  onRenderLoading,
  isSubmitting,
  onHandleBookmark,
  savedMovies,
  isThereSortetMovies,
}) {
  return (
    <main className="main">
      <SearchForm
        onSearchFormSubmit={onSearchFormSubmit}
        onChecked={onChecked}
        onSearchText={onSearchText}
        onRenderLoading={onRenderLoading}
        isChecked={isChecked}
      />
      <MoviesCardList
        movies={movies}
        visible={visible}
        loadMore={loadMore}
        isSubmitting={isSubmitting}
        onHandleBookmark={onHandleBookmark}
        savedMovies={savedMovies}
        sortedMovies={movies}
        isThereSortetMovies={isThereSortetMovies}
      />
    </main>
  );
}

export default Movies;
