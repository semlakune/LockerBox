import {LOCKER_FETCH_ALL} from "../actions/actionType";

const initialState = {
    lockers: []
}

export default function lockerReducer(state = initialState, action) {
    switch (action.type) {
        case LOCKER_FETCH_ALL:
            return { ...state, lockers: action.payload }
        default:
            return state
    }
}