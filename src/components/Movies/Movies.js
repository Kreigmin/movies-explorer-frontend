import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import womanAndChildren from "../../images/woman-and-children.jpg";
import oldFormatPhoto from "../../images/old-format-photo.jpg";
import manWithGuitar from "../../images/man-with-guitar.jpg";
import hall from "../../images/hall.jpg";
import peopleOnSkateboard from "../../images/people-on-skateboard.jpg";
import roomWithBooks from "../../images/room-with-books.jpg";
import men from "../../images/men.jpg";
import graffiti from "../../images/graffiti.jpg";
import marathon from "../../images/marathon.jpg";
import party from "../../images/party.jpg";
import manWithSigarette from "../../images/man-with-sigarette.jpg";
import workingMan from "../../images/working-man.jpg";

function Movies() {
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
    {
      id: 4,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: hall,
    },
    {
      id: 5,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: peopleOnSkateboard,
    },
    {
      id: 6,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: roomWithBooks,
    },
    {
      id: 7,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: men,
    },
    {
      id: 8,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: graffiti,
    },
    {
      id: 9,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: marathon,
    },
    {
      id: 10,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: party,
    },
    {
      id: 11,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: manWithSigarette,
    },
    {
      id: 12,
      nameRU: "33 слова о дизайне",
      duration: "1ч 47м",
      image: workingMan,
    },
  ];

  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default Movies;
