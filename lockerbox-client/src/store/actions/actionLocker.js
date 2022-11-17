import {LOCKER_FETCH_ALL} from "./actionType";
import {api_url} from "../../constant/api_url";

export const lockerList = (payload) => {
    return { type: LOCKER_FETCH_ALL, payload }
}

//thunk

export const fetchAllLocker = () => {
    return (dispatch) => {
        return fetch(api_url + "/lockers", {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', },
        })
            .then((res) => {
                if(!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((data) => {
                dispatch(lockerList(data))
            })
    }
}