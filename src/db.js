/*
    when the application starts
    check if user exists in wishlist if exist in wishlist get his wishlist data if not then create his wishlist entry.
    when the card is opened just check if the current movie is wishlisted movie or not depending upon what it is show that
    */
import {
  doc,
  getDoc,
  setDoc,
  collection,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

async function addToWishlist(userId, movieId) {
  // we wil first see if an entry exists for the user
  try {
    const docRef = doc(db, "wishlist", userId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.exists());
    console.log("code is executing...");
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      let existingMovies = docSnap.data().movies;
      await setDoc(doc(db, "wishlist", userId), {
        movies: [...existingMovies, movieId],
      });
      // if exists then just append to the existing list
    } else {
      // set the document
      await setDoc(doc(db, "wishlist", userId), {
        movies: [movieId],
      });
      //   const userFavList = doc(collection(db, "wishlist", userId));
      //   await setDoc(userFavList, [movieId]);
      //   console.log("No such document!");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function getUserFavList(userId) {
  const docRef = doc(db, "wishlist", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const movieExists = docSnap.data();
    return movieExists.movies;
  }
  return false;
}

async function removeMovieFromList(userId, movieId) {
  try {
    const docRef = doc(db, "wishlist", userId);
    await updateDoc(docRef, { movies: arrayRemove(movieId) });
    // const docSnap = await getDoc(docRef);
    // const moviesArray = docSnap.data();
    // // moviesArray.append(movieId);
    // // const array = [1, 2, 3, 4, 5];
    // const index = moviesArray.indexOf(3);
    // if (index > -1) {
    //   moviesArray.splice(index, 1);
    // }
    // await setDoc(docRef, moviesArray);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getMovieStatus(useId, movieId) {
  // check if the move is in the wishlist or not
  // if it is in the wishlist then return true else return false
  const docRef = doc(db, "wishlist", useId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const docData = docSnap.data();
    console.log(docData);
    const moviesArray = docData.movies;
    console.log(moviesArray.includes(movieId));
    return moviesArray.includes(movieId);
  } else {
    return false;
  }
}

export { addToWishlist, getUserFavList, removeMovieFromList, getMovieStatus };
