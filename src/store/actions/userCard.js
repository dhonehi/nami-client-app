import {ADD_TO_USER_CARD, CLEAR_USER_CARD, REMOVE_ALL_PRODUCT, REMOVE_FROM_USER_CARD} from "./types";

export const addToUserCard = product => {
    return {
        type: ADD_TO_USER_CARD,
        payload: product
    }
}

export const removeFromUserCard = product => {
    return {
        type: REMOVE_FROM_USER_CARD,
        payload: product
    }
}

export const removeAllProduct = product => {
    return {
        type: REMOVE_ALL_PRODUCT,
        payload: product
    }
}

export const clearUserCard = () => {
    return {
        type: CLEAR_USER_CARD
    }
}
