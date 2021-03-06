import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./App.css";
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
import {
  LARGE_WIDTH_MOVIES_DISPLAY,
  MEDIUM_WIDTH_MOVIES_DISPLAY,
  SMALL_WIDTH_MOVIES_DISPLAY,
  CONFLICT_ERROR_STATUS_CODE,
  UNAUTHORIZED_ERROR_STATUS_CODE,
} from "../../utils/constants";

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

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getContent()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`????????????: ${res.status}`);
      })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          if (
            location.pathname === "/signin" ||
            location.pathname === "/signup"
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
      Promise.all([
        mainApi.getUserInfo(),
        mainApi.getSavedMovies(),
        movieApi.getAllMovies(),
      ])
        .then((data) => {
          const [userInfo, savedMovies, allMovies] = data;
          setIsThereSortedMovies(true);
          setIsThereSortedSavedMovies(true);
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies.movies);
          setMovies(allMovies);
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
        mainApi
          .signIn(email, password)
          .then(() => {
            setLoggedIn(true);
            history.push("/movies");
            setMovies([]);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.status === CONFLICT_ERROR_STATUS_CODE) {
          setErrorStatus(true);
          setErrorInfoText("???????????????????????? ?? ?????????? email ?????? ????????????????????.");
        } else {
          setErrorStatus(true);
          setErrorInfoText("?????? ?????????????????????? ???????????????????????? ?????????????????? ????????????.");
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
        if (err.status === UNAUTHORIZED_ERROR_STATUS_CODE) {
          setErrorStatus(true);
          setErrorInfoText("???? ?????????? ???????????????????????? ?????????? ?????? ????????????.");
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
        if (err.status === CONFLICT_ERROR_STATUS_CODE) {
          setErrorStatus(true);
          setErrorInfoText("???????????????????????? ?? ?????????? email ?????? ????????????????????.");
        } else {
          setErrorStatus(true);
          setErrorInfoText("?????? ???????????????????? ?????????????? ?????????????????? ????????????.");
        }
      });
  }

  function handleSignOut() {
    mainApi
      .signOut()
      .then(() => {
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMoviesCheckboxBtnClick() {
    setIsChecked(!isChecked);
  }

  function handleSavedMoviesCheckboxBtnClick() {
    setIsCheckedSavedMovies(!isCheckedSavedMovies);
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
      mainApi
        .createMovie({
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
        })
        .then((data) => {
          setSavedMovies([data.movie, ...savedMovies]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const currentSavedMovie = savedMovies.filter(
        (item) => item.nameRU === movie.nameRU
      );
      mainApi
        .deleteMovie(currentSavedMovie[0]._id)
        .then(() => {
          setSavedMovies((state) =>
            state.filter((k) => k._id !== currentSavedMovie[0]._id)
          );
        })
        .catch((err) => {
          console.log(err);
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
      setSortedSavedMovies(savedMovies);
      setIsCheckedSavedMovies(false);
    }
    setSavedMoviesSearchText("");
  }, [location.pathname]);

  useEffect(() => {
    if (width > 768) {
      return setVisible(LARGE_WIDTH_MOVIES_DISPLAY);
    } else if (width <= 768 && width > 321) {
      return setVisible(MEDIUM_WIDTH_MOVIES_DISPLAY);
    } else if (width <= 320) {
      return setVisible(SMALL_WIDTH_MOVIES_DISPLAY);
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
  }, [isChecked, searchText]);

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
  }, [isCheckedSavedMovies, savedMovies, savedMoviesSearchText]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
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
              loggedIn={loggedIn}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <SavedMovies
              savedMovies={sortedSavedMovies}
              onDeleteMovie={handleDeleteMovie}
              onCheckedSavedMovies={handleSavedMoviesCheckboxBtnClick}
              setSavedMoviesSearchText={setSavedMoviesSearchText}
              onRenderLoading={renderLoading}
              isCheckedSavedMovies={isCheckedSavedMovies}
              isThereSortedSavedMovies={isThereSortedSavedMovies}
              isSubmitting={isSubmitting}
              loggedIn={loggedIn}
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
              loggedIn={loggedIn}
            />
          </ProtectedRoute>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
