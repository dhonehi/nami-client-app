import {LOGIN} from "./types";

export const login = userInfo => {
    return {
        type: LOGIN,
        payload: userInfo
    }
}