import {LOGIN, LOGOUT, SET_PROFILE_AVATAR, SET_USER_INFO} from "./types";

export const login = userInfo => {
    return {
        type: LOGIN,
        payload: userInfo
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const setUserInfo = userInfo => {
    return {
        type: SET_USER_INFO,
        payload: userInfo
    }
}

export const setProfileAvatar = uri => {
    return {
        type: SET_PROFILE_AVATAR,
        payload: uri
    }
}