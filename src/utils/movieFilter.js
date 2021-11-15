import { SHORT_FILM_DURATION } from "./constants";

export function filterCheckedMovies(movies, searchText) {
  const filteredMovies = movies.filter((movie) => {
    if (
      movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) &&
      movie.duration <= SHORT_FILM_DURATION
    ) {
      return true;
    } else {
      return false;
    }
  });
  return filteredMovies;
}

export function filterMovies(movies, searchText) {
  const filteredMovies = movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchText.toLowerCase());
  });
  return filteredMovies;
}
