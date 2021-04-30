import { createStore, combineReducers } from 'redux';
import userCardReducer from "./reducers/userCardReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    userCard: userCardReducer,
    auth: authReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore