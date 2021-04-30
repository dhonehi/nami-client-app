import {AsyncStorage} from 'react-native'

import {LOGIN} from "../actions/types";

let isLoggedIn = false

let initialState = {
    isLoggedIn,
    userInfo: null
}

AsyncStorage.getItem('isLoggedIn').then(response => {
    if (response && response === 'true') initialState.isLoggedIn = true
    else initialState.isLoggedIn = false
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                isLoggedIn: true,
                userInfo: action.payload
            }
        }
        default:
            return state
    }
}

export default authReducer