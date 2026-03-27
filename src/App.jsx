import { useEffect, useState } from "react";
import "./styles.css";

const API_KEY = "be5843afe8aeae556f9fb3384f69d3fb";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function App() {
const [movies, setMovies] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [currentSort, setCurrentSort] = useState("popularity.desc");
const [currentSearch, setCurrentSearch] = useState("");

useEffect(() => {
  async function getMovies(){
    let url;
      if (currentSearch === ""){
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${currentPage}&sort_by=${currentSort}`;
        }else{
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${currentSearch}&page=${currentPage}`;
      }
    const response = await fetch(url);
    const data = await response.json();
    setTotalPages(data.total_pages);
    setMovies(data.results);
  }
  getMovies();
},[currentPage, currentSort, currentSearch]);
return (
<div>
  <h1 id="header">Movie Explorer</h1>
  <div id="search_bars">
      <input id="search" type="text" placeholder="Search for a movie..." value={currentSearch}
        onChange={(e) => {setCurrentSearch(e.target.value);setCurrentPage(1);}}/>
      <select id ="sort" value={currentSort}
        onChange={(e) => setCurrentSort(e.target.value)}>
          <option value="popularity.desc">Sort By</option>
          <option value="release_date.asc">Release Date (Asc)</option>
          <option value="release_date.desc">Release Date (Desc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
      </select>
  </div>

  <div id="movies">
    {movies.map((movie) => (
      <div className="movie" key={movie.id}>
        <img src={IMG_URL + movie.poster_path} alt={movie.title}/>
        <h3>{movie.title}</h3>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    ))}
  </div>

  <div id="pages">
    <button onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}>
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button onClick={() => setCurrentPage((prev) => prev + 1)}>
      Next
    </button>
  </div>
  
</div>
  );
}



