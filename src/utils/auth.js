function getContent() {
  return fetch("https://bestest-movies.nomoredomains.monster/api/users/me", {
    credentials: "include",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default getContent;
