import {ADD_TO_USER_CARD, ADD_PRODUCTS_TO_USER_CARD, CLEAR_USER_CARD, REMOVE_ALL_PRODUCT, REMOVE_FROM_USER_CARD} from "../actions/types";

const initialState = {
    userCard: []
}

const userCardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_USER_CARD: {
            const foundProduct = state.userCard.find(item => item._id === action.payload._id)
            if (foundProduct) {
                ++foundProduct.count
                return {
                    userCard: [...state.userCard]
                }
            } else {
                return {
                    userCard: [...state.userCard, {...action.payload, count: 1}]
                }
            }
        }
        case ADD_PRODUCTS_TO_USER_CARD: {
            return {
                userCard: action.payload.map(product => {
                    return {
                        ...product.product,
                        count: product.count
                    }
                })
            }
        }
        case REMOVE_FROM_USER_CARD:
            const foundProduct = state.userCard.find(item => item._id === action.payload._id)
            if (foundProduct && foundProduct.count > 1)  {
                --foundProduct.count
                return {
                    userCard: [...state.userCard]
                }
            } else {
                return {
                    userCard: state.userCard.filter(item => item._id !== action.payload._id)
                }
            }
        case REMOVE_ALL_PRODUCT:
            return {
                userCard: state.userCard.filter(item => item._id !== action.payload._id)
            }
        case CLEAR_USER_CARD:
            return {
                userCard: []
            }
        default:
            return state
    }
}

export default userCardReducer