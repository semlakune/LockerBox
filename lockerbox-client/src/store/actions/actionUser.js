import {api_url} from "../../constant/api_url";
import {USER_FETCH_DETAIL} from "./actionType";

export const userDetail = (payload) => {
    return { type: USER_FETCH_DETAIL, payload }
}



// thunk

export const registerHandler = (payload) => {
    return (dispatch) => {
        return fetch(api_url + "/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
    }
}

export const loginHandler = (payload) => {
    return (dispatch) => {
        return fetch(api_url + "/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
    }
}

export const fetchUserDetail = () => {
    return (dispatch) => {
        return fetch(api_url + "/users", {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', },
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((data) => {
                dispatch(userDetail(data))
            })
    }
}

export const topUpBalance = (payload) => {
    return (dispatch) => {
        return fetch(api_url + "/topups", {
            method: "PATCH",
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'application/json', },
            body: JSON.stringify({amount: +payload})
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
    }
}