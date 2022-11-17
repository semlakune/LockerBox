import {USERLOCKER_FETCH_ALL, USERLOCKER_FETCH_CART} from "../actions/actionType";


const initialState = {
    mylockers: [],
    carts: []
}

export default function userLockerReducer(state = initialState, action) {
    switch (action.type) {
        case USERLOCKER_FETCH_ALL:
            return { ...state, mylockers: action.payload }
        case USERLOCKER_FETCH_CART:
            return { ...state, carts: action.payload }
        default:
            return state
    }
}