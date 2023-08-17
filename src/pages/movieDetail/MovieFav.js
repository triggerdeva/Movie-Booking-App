import {useState, useEffect} from "react";
import {addToWishlist, removeMovieFromList} from "../../../db"

const MovieFav = ({isFav, userId, movieId}) => {
    const [loading, setLoading] = useState(false);
    const [isFavorate, setIsFavorate] = useState(isFav);
    async function handleRemove(){
        setLoading(true);
        const isSuccess = await addToWishlist(userId, movieId);
        if(isSuccess){
            isFavorate(true);
        }
        setLoading(false);
    }
    async function handleAdd(){
        setLoading(true);
        const isSuccess = await removeMovieFromList(userId, movieId);
        if(isSuccess){
            isFavorate(false);
        }
        setLoading(false);
    }
  return (
    <>  
        {
            isFavorate  ? (
                <button disabled={loading} onClick={handleAdd}>add to favorite</button>
            ) : (
                <button disabled={loading} onClick={handleRemove}>remove from favorite</button>
            )
        }
    </>
  )
}

export default MovieFav;