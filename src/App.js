import React, { useState } from "react";
import MovieCard from "./MovieCard.jsx";

import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1 className="title">React Movie App</h1>
      <SearchMovies />
    </div>
  );
};

const SearchMovies = () => {
  // states we need to display: input query and movies
  const [query, setQuery] = useState("");
  // state for movies, and update them accordingly
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    // const query = "Titanic";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fc26002264d7b35e24e1d31fa091b55a&language=en-US&query=${query}&page=1&include_adult=false
    `;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data.results);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e Titanic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default App;
