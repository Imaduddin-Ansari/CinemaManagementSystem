import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import axios from 'axios';
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constants';

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const res = await axios.get(`http://cinema-backend:3000/api/movies/movie/${query}`);
          setResults(res.data.content);
          console.log(res.data.content);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      };
      fetchResults();
    }
  }, [query]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log("Search query:", query);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-red-950 font-poppins'>
      <Navbar onSearch={handleSearch}/>
      <div className='container mx-auto px-4 py-8'>
        <h1 className="mt-14 text-4xl font-bold text-center text-white mb-8">Search Results for: {query}</h1>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results.map((result) => (
              <div key={result.id} className="bg-black p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.title} className="w-full h-auto rounded-md mb-4" />
                <h2 className="text-xl font-semibold text-white">{result.title}</h2>
                <p className="mt-2 text-gray-300 text-sm">{result.overview.length > 100 ? result.overview.substring(0, 100) + '...' : result.overview}</p>
                <p className="text-gray-400 text-sm mt-2">Release Date: {new Date(result.release_date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm">Genres: {result.genre_ids.join(', ')}</p>
                <p className="text-gray-400 text-sm">Rating: {result.vote_average}/10</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-2xl text-white text-center mt-8">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
};
