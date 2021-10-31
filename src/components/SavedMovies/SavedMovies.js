import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import womanAndChildren from "../../images/woman-and-children.jpg";
import oldFormatPhoto from "../../images/old-format-photo.jpg";
import manWithGuitar from "../../images/man-with-guitar.jpg";

function SavedMovies() {
  const cards = [
    {
      id: 1,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: womanAndChildren,
    },
    {
      id: 2,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: oldFormatPhoto,
    },
    {
      id: 3,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: manWithGuitar,
    },
  ];

  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default SavedMovies;
