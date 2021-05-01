import {AsyncStorage} from 'react-native'

import {ADD_TO_FAVOURITES, REMOVE_FROM_FAVOURITES} from "../actions/types";

let initialState = {
    favourites: []
}

AsyncStorage.getItem('favourites').then(response => {
    if (response && response === 'true') initialState.favourites = response.json
    console.log(initialState)
})

const saveFavouritesToStorage = (favourites) => {
    AsyncStorage.setItem('favourites', JSON.stringify(favourites))
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITES: {
            const favourites = [...state.favourites, action.payload]
            saveFavouritesToStorage(favourites)
            return {
                favourites
            }
        }
        case REMOVE_FROM_FAVOURITES: {
            const favourites = state.favourites.filter(product => product._id !== action.payload._id)
            saveFavouritesToStorage(favourites)
            return {
                favourites
            }
        }
        default:
            return state
    }
}

export default authReducer