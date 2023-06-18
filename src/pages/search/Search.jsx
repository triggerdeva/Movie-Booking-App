import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/card/card";
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const { query } = useParams();
    // console.log("look here", query, decodeURIComponent(query));
    const getQueryData = async (query) => {
        let url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`;
        let result = await fetch(url)
            .then((res) => res.json())
            .then((data) => data.results);
        return result;
    };
    useEffect(() => {
        (async () => {
            const result = await getQueryData(query);
            setMovies(result);
        })();
    }, []);
    return (
        <div className="movie__list">
            <h2 className="list__title">{"Search"}</h2>
            <div className="list__cards">
                {movies.map((movie) => (
                    <Cards movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Search;
