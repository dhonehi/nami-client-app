import {SEARCH} from "../actions/types";

const initialState = {
    search: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH: {
            return {
                search: action.payload
            }
        }
        default:
            return state
    }
}

export default searchReducer