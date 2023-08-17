// WatchlistPage.js
import React, { useEffect, useState, useRef } from "react";
import useLoginContext from "../hooks/useLoginContext";
import Card from "./card/card";
import { getUserFavList } from "../db";
const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [watchListMovieData, setWatchListMovieData] = useState([]);
  const isMounted = useRef(true);
  const { user } = useLoginContext();
  useEffect(() => {
    if (isMounted.current) {
      (async () => {
        const watchlist = await getUserFavList(user?.uid);
        if (watchlist) {
          setWatchlist(watchlist);
        }
        isMounted.current = false;
      })();
    }
  }, []);
  useEffect(() => {
    if (watchlist.length > 0) {
      (async () => {
        const moviesData = [];
        for (let i = 0; i < watchlist.length; i++) {
          const movieData = await getMovieData(watchlist[i]);
          moviesData.push(movieData);
        }
        setWatchListMovieData(moviesData);
      })();
    }
  }, [watchlist]);

  async function getMovieData(movieId) {
    // https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    );
    const data = await response.json();
    return data;
  }
  return (
    <div>
      {watchListMovieData.map((movie) => (
        <Card movie={movie} />
      ))}
    </div>
  );
};

export default WatchlistPage;
