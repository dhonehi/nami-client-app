import {SEARCH} from "./types";

export const search = text => {
    return {
        type: SEARCH,
        payload: text
    }
}