import {AsyncStorage} from 'react-native'

import {LOGIN} from "../actions/types";

let isLoggedIn = false

let initialState = {
    isLoggedIn,
    userInfo: null,
    sessionId: null
}

AsyncStorage.getItem('isLoggedIn').then(response => {
    if (response && response === 'true') initialState.isLoggedIn = true
    else initialState.isLoggedIn = false
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            AsyncStorage.setItem('isLoggedIn', 'true')
            return {
                isLoggedIn: true,
                userInfo: action.payload.userInfo,
                sessionId: action.payload.sessionId
            }
        }
        default:
            return state
    }
}

export default authReducer