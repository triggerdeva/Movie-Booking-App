/*
    when the application starts
    check if user exists in wishlist if exist in wishlist get his wishlist data if not then create his wishlist entry.
    when the card is opened just check if the current movie is wishlisted movie or not depending upon what it is show that
    */
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
   
async function addToWishlist(userId, movieId){
    // we wil first see if an entry exists for the user
    const docRef = doc(db, "wishlist", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // if exists then just append to the existing list
    } else {
        const userFavList = doc(collection(db, "wishlist", userId));
        await setDoc(userFavList, [movieId]);
        console.log("No such document!");
    }
}
async function getUserFavList(userId,movieId){
    const docRef = doc(db, "wishlist", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const movieExists = docSnap.data();
        console.log(movieExists);
        return  Boolean(movieExists.find(item => item === movieId)) 
    }
    return false
}

async function removeMovieFromList(userId, movieId){
    try{
        const docRef = doc(db, "wishlist", userId);
        const docSnap = await getDoc(docRef);
        const moviesArray = docSnap.data();
        // moviesArray.append(movieId);
        // const array = [1, 2, 3, 4, 5];
        const index = moviesArray.indexOf(3);
        if (index > -1) {
            moviesArray.splice(index, 1);
        }
        await setDoc(docRef, moviesArray);
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}


