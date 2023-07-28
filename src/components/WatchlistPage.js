// WatchlistPage.js
import React, { useState } from 'react';

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movieInput, setMovieInput] = useState('');

  const handleAddMovie = () => {
    if (movieInput.trim() !== '') {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movieInput]);
      setMovieInput('');
    }
  };

  return (
    <div>
      <h1>Watchlist</h1>
      <div>
        <input
          type="text"
          value={movieInput}
          onChange={(e) => setMovieInput(e.target.value)}
          placeholder="Enter movie title"
        />
        <button onClick={handleAddMovie}>Add to Watchlist</button>
      </div>
      <ul>
        {watchlist.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistPage;
