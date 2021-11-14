import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import getContent from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import movieApi from "../../utils/MoviesApi";
import useWindowSize from "../../utils/useWindowSize";
import { filterCheckedMovies, filterMovies } from "../../utils/movieFilter";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isThereSortetMovies, setIsThereSortedMovies] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [sortedSavedMovies, setSortedSavedMovies] = useState([]);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [isThereSortedSavedMovies, setIsThereSortedSavedMovies] =
    useState(true);
  const [visible, setVisible] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [savedMoviesSearchText, setSavedMoviesSearchText] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorInfoText, setErrorInfoText] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [width, height] = useWindowSize();

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    getContent()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsThereSortedMovies(true);
          if (
            location.pathname === "/signin" ||
            location.pathname === "/signup" ||
            location.pathname === "/"
          ) {
            history.push("/movies");
          } else {
            history.push(location.pathname);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then((data) => {
          const [userInfo, savedMovies] = data;
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies.movies);
          setIsThereSortedMovies(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function renderLoading(isLoading) {
    setIsSubmitting(isLoading);
  }

  function handleRegisterSubmit(evt, name, email, password) {
    evt.preventDefault();
    mainApi
      .signUp(name, email, password)
      .then(() => {
        mainApi.signIn(email, password).then(() => {
          setLoggedIn(true);
          history.push("/movies");
          setMovies([]);
        });
      })
      .catch((err) => {
        if (err.status === 409) {
          setErrorStatus(true);
          setErrorInfoText("Пользователь с таким email уже существует.");
        } else {
          setErrorStatus(true);
          setErrorInfoText("При регистрации пользователя произошла ошибка.");
        }
      });
  }

  function handleLoginSubmit(evt, email, password) {
    evt.preventDefault();
    mainApi
      .signIn(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push("/movies");
        setMovies([]);
      })
      .catch((err) => {
        if (err.status === 401) {
          setErrorStatus(true);
          setErrorInfoText("Вы ввели неправильный логин или пароль.");
        }
      });
  }

  function handleProfileSubmit(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setErrorStatus(false);
        setSuccessStatus(true);
      })
      .catch((err) => {
        if (err.status === 409) {
          setErrorStatus(true);
          setErrorInfoText("Пользователь с таким email уже существует.");
        } else {
          setErrorStatus(true);
          setErrorInfoText("При обновлении профиля произошла ошибка.");
        }
      });
  }

  function handleSignOut() {
    mainApi.signOut().then(() => {
      setLoggedIn(false);
      history.push("/");
    });
  }

  function handleMoviesCheckboxBtnClick() {
    setIsChecked(!isChecked);
  }
  function handleSavedMoviesCheckboxBtnClick() {
    setIsCheckedSavedMovies(!isCheckedSavedMovies);
  }

  function handleSearchFormSubmit() {
    movieApi
      .getAllMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleSavedMoviesSearchFormSubmit() {
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data.movies);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleBookmarkMovieStatus(movie) {
    const isBookmark = savedMovies.some((i) => i.nameRU === movie.nameRU);
    if (!isBookmark) {
      const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        id,
      } = movie;
      mainApi.createMovie({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailer: trailerLink,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        nameRU,
        nameEN,
        movieId: id,
      });
    } else {
      const currentSavedMovie = savedMovies.filter(
        (item) => item.nameRU === movie.nameRU
      );
      mainApi.deleteMovie(currentSavedMovie[0]._id).then(() => {
        setSavedMovies((state) =>
          state.filter((k) => k._id !== currentSavedMovie[0]._id)
        );
      });
    }
  }

  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId).then(() => {
      setSavedMovies((state) => state.filter((movie) => movie._id !== movieId));
    });
  }

  function hanleMoreBtnClick() {
    if (width > 768) {
      setVisible(visible + 3);
    } else if (width <= 768) {
      setVisible(visible + 2);
    }
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      mainApi
        .getSavedMovies()
        .then((data) => {
          setSavedMovies(data.movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setSavedMoviesSearchText("");
  }, [location.pathname]);

  useEffect(() => {
    if (width > 768) {
      return setVisible(12);
    } else if (width <= 768 && width > 321) {
      return setVisible(8);
    } else if (width <= 320) {
      return setVisible(5);
    }
  }, [width]);

  useEffect(() => {
    if (isChecked) {
      const filteredCheckedMovies = filterCheckedMovies(movies, searchText);
      if (filteredCheckedMovies.length !== 0) {
        setSortedMovies(filteredCheckedMovies);
      } else {
        setSortedMovies(filteredCheckedMovies);
        setIsThereSortedMovies(false);
      }
    } else {
      const filteredMovies = filterMovies(movies, searchText);
      if (filteredMovies.length !== 0) {
        setSortedMovies(filteredMovies);
      } else {
        setSortedMovies(filteredMovies);
        setIsThereSortedMovies(false);
      }
    }
  }, [isChecked, movies]);

  useEffect(() => {
    if (isCheckedSavedMovies) {
      const filteredCheckedSavedMovies = filterCheckedMovies(
        savedMovies,
        savedMoviesSearchText
      );
      if (filteredCheckedSavedMovies.length !== 0) {
        setSortedSavedMovies(filteredCheckedSavedMovies);
      } else {
        setSortedSavedMovies(filteredCheckedSavedMovies);
        setIsThereSortedSavedMovies(false);
      }
    } else {
      const filteredSavedMovies = filterMovies(
        savedMovies,
        savedMoviesSearchText
      );
      if (filteredSavedMovies.length !== 0) {
        setSortedSavedMovies(filteredSavedMovies);
      } else {
        setSortedSavedMovies(filteredSavedMovies);
        setIsThereSortedSavedMovies(false);
      }
    }
  }, [isCheckedSavedMovies, savedMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Switch>
          <Route path="/signin">
            <Login
              onLogin={handleLoginSubmit}
              errorStatus={errorStatus}
              errorInfoText={errorInfoText}
              setErrorStatus={setErrorStatus}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegisterSubmit}
              errorStatus={errorStatus}
              errorInfoText={errorInfoText}
              setErrorStatus={setErrorStatus}
            />
          </Route>

          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Movies
              onSearchFormSubmit={handleSearchFormSubmit}
              movies={sortedMovies}
              visible={visible}
              loadMore={hanleMoreBtnClick}
              isChecked={isChecked}
              onChecked={handleMoviesCheckboxBtnClick}
              onSearchText={setSearchText}
              onRenderLoading={renderLoading}
              isSubmitting={isSubmitting}
              savedMovies={savedMovies}
              onHandleBookmark={handleBookmarkMovieStatus}
              isThereSortetMovies={isThereSortetMovies}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={sortedSavedMovies}
              onDeleteMovie={handleDeleteMovie}
              onCheckedSavedMovies={handleSavedMoviesCheckboxBtnClick}
              setSavedMoviesSearchText={setSavedMoviesSearchText}
              onRenderLoading={renderLoading}
              onSavedMoviesSearchFormSubmit={handleSavedMoviesSearchFormSubmit}
              isCheckedSavedMovies={isCheckedSavedMovies}
              isThereSortedSavedMovies={isThereSortedSavedMovies}
              isSubmitting={isSubmitting}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              onSignOut={handleSignOut}
              onProfileSubmit={handleProfileSubmit}
              errorStatus={errorStatus}
              errorInfoText={errorInfoText}
              successStatus={successStatus}
              setSuccessStatus={setSuccessStatus}
            />
          </ProtectedRoute>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="">
            <NotFoundPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
