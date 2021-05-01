import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES} from "./types";

export const addToFavourites = product => {
    return {
        type: ADD_TO_FAVOURITES,
        payload: product
    }
}

export const removeFromFavourites = product => {
    return {
        type: REMOVE_FROM_FAVOURITES,
        payload: product
    }
}