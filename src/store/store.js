import { createStore, combineReducers } from 'redux';
import userCardReducer from "./reducers/userCardReducer";
import authReducer from "./reducers/authReducer";
import favouritesReducer from "./reducers/favouritesReducer";

const rootReducer = combineReducers({
    userCard: userCardReducer,
    auth: authReducer,
    favourites: favouritesReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore