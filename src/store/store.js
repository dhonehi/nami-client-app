import { createStore, combineReducers } from 'redux';
import userCardReducer from "./reducers/userCardReducer";
import authReducer from "./reducers/authReducer";
import favouritesReducer from "./reducers/favouritesReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
    userCard: userCardReducer,
    auth: authReducer,
    favourites: favouritesReducer,
    search: searchReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore