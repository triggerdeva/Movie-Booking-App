import { useState, useEffect, useRef } from "react";
// import { addToWishlist, removeMovieFromList } from "../../../db";
import { addToWishlist, removeMovieFromList, getMovieStatus } from "../../db";
const MovieFav = ({ userId, movieId }) => {
  console.log(userId, "line 5...", movieId);
  const [loading, setLoading] = useState(true);
  const [isFavorate, setIsFavorate] = useState(false);
  const isMounted = useRef(true);

  async function handleAdd() {
    console.log("handleAdd is getting executed...");
    setLoading(true);
    const isSuccess = await addToWishlist(userId, movieId);
    if (isSuccess) {
      setIsFavorate(true);
    } else {
      setIsFavorate(false);
    }
    setLoading(false);
  }
  async function handleRemove() {
    setLoading(true);
    const isSuccess = await removeMovieFromList(userId, movieId);
    if (isSuccess) {
      setIsFavorate(false);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (isMounted.current) {
      (async () => {
        const movieStatus = await getMovieStatus(userId, movieId);
        console.log(movieStatus, "is the movie status");
        setIsFavorate(movieStatus);
        setLoading(false);
        isMounted.current = false;
      })();
    }
  }, []);
  return (
    <>
      {isFavorate ? (
        <button disabled={loading} onClick={handleRemove}>
          remove from favorite
        </button>
      ) : (
        <button disabled={loading} onClick={handleAdd}>
          add to favorite
        </button>
      )}
    </>
  );
};

export default MovieFav;
