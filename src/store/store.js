import { createStore, combineReducers } from 'redux';
import userCardReducer from "./reducers/userCardReducer";

const rootReducer = combineReducers({
    userCard: userCardReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}

export default configureStore