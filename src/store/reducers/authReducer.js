import {AsyncStorage} from 'react-native'

import {LOGIN, LOGOUT, SET_PROFILE_AVATAR, SET_USER_INFO} from "../actions/types";

let isLoggedIn = false

let initialState = {
    isLoggedIn,
    userInfo: null,
    sessionId: null
}

AsyncStorage.getItem('isLoggedIn').then(response => {
    if (response && response === 'true') {
        const getUserInfo = AsyncStorage.getItem('userInfo'), getSessionId = AsyncStorage.getItem('sessionId')

        Promise.all([getUserInfo, getSessionId]).then(response => {
            initialState.isLoggedIn = true
            initialState.userInfo = JSON.parse(response[0])
            initialState.sessionId = response[1]
        })
    }
    else initialState.isLoggedIn = false
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            AsyncStorage.setItem('isLoggedIn', 'true')
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
            AsyncStorage.setItem('sessionId', action.payload.sessionId)
            return {
                isLoggedIn: true,
                userInfo: action.payload.userInfo,
                sessionId: action.payload.sessionId
            }
        }
        case LOGOUT: {
            AsyncStorage.removeItem('isLoggedIn')
            AsyncStorage.removeItem('userInfo')
            AsyncStorage.removeItem('sessionId')
            return {
                isLoggedIn: false,
                userInfo: null,
                sessionId: null
            }
        }
        case SET_USER_INFO: {
            AsyncStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                isLoggedIn: true,
                userInfo: action.payload,
                sessionId: state.sessionId
            }
        }
        case SET_PROFILE_AVATAR: {
            const userInfo = state.userInfo
            userInfo.avatar = action.payload
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            return {
                isLoggedIn: true,
                userInfo,
                sessionId: state.sessionId
            }
        }
        default:
            return state
    }
}

export default authReducer