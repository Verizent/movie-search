import {React, useState} from "react";
// import axios from "axios";
import './index.css';
import MovieComponent from "./components/MovieComponent";

export default function App() {
  const [everSearch, updateEverSearch] = useState(false);
  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState([]);
  const [loading, updateLoading] = useState(false);

  const dataFetch = async (searchString) => {
    // const response = await axios.get(`http://www.omdbapi.com/?&apikey=e1a73560&s=${searchString}&type="movie"`);
    const apiUrl = `http://www.omdbapi.com/?&apikey=e1a73560&s=${searchString}&type=movie`;
    updateLoading(true);
    const data = await fetch(apiUrl).then(response => response.json());
    updateLoading(false);
    updateMovieList(data.Search);
    updateEverSearch(Boolean(searchString.trim().length));
    // Bukan 0 adalah true, 0 adalah false
    // searchString didapat ketika onChange, trim ==> menghapus semua space bar dan lain-lain menjadi string kosong
  }

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    // ^^^ Dipake buat hapus waktu tunggu hasil search
    // updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => dataFetch(event.target.value), 1000);
    // ^^^ Memulai proses pencarian baru
    updateTimeoutId(timeout);
  }

  const classNameSpan = [
    'flex flex-row bg-black text-white w-full text-center font-bold px-3 text-xl md:text-4xl lg:text-4xl py-auto shadow-md items-center fixed'
  ];

  const showMovies = () => {
    if (loading) {
      return <div className="mt-12 text-lg text-center">Loading...</div>
    }
    if (everSearch){
      return(
        <div className="grid grid-cols-1 gap-3 items-center lg:grid-cols-5 md:grid-cols-3 p-5">
          {movieList?.length 
            ? movieList.map((movie, index)=>
              <MovieComponent key={index} movie={movie} />
              ) 
            : <div className="mt-16 text-black text-left">No movie found...</div>} 
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <div className="bg-white flex flex-column">
      <div className={classNameSpan}>
        <img src="/favicon.ico" className="w-auto h-16" alt=""/>
        <h1 className="ml-3">Movie Searcher</h1>
        <input type="text" 
          className="rounded-md flex ml-auto mr-3 items-center px-3 text-white focus:text-black font-extralight text-xl py-1 lg:py-2 md:py-2 w-34 lg:w-64 md:w-64 bg-gray-800 underline-offset-8 focus:bg-white" 
          placeholder="🔍   search a movie" 
          // value={searchQuery} // Selalu kosong
          onChange={onTextChange} 
          />
      </div>
      <div className="p-5 w-full">
        {showMovies()}
      </div>
    </div>
  );
}