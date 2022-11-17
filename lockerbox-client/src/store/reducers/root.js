import {combineReducers} from "redux";
import userReducer from "./user";
import lockerReducer from "./locker";
import userLockerReducer from "./userlocker";

const rootReducer = combineReducers({
    userReducer,
    lockerReducer,
    userLockerReducer
})

export default rootReducer