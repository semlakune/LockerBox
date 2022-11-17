import {USERLOCKER_FETCH_ALL, USERLOCKER_FETCH_CART} from "./actionType";
import {api_url} from "../../constant/api_url";

export const userLockerList = (payload) => {
    return { type: USERLOCKER_FETCH_ALL, payload }
}

export const cartList = (payload) => {
    return { type: USERLOCKER_FETCH_CART, payload }
}

//thunk

export const fetchUserLockers = () => {
    return (dispatch) => {
        return fetch(api_url + "/userlockers", {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded' }
        })
            .then((res) => {
                if(!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json()
            })
            .then((data) => {
                dispatch(userLockerList(data))
            })
    }
}

export const fetchCart = () => {
    return (dispatch) => {
        return fetch(api_url + "/carts", {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded' }
        })
            .then((res) => {
                if(!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json()
            })
            .then((data) => {
                dispatch(cartList(data))
            })
    }
}

export const addToCart = (lockerId) => {
    return (dispatch) => {
        return fetch(api_url + "/add-cart/" + lockerId, {
            method: "POST",
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded' },
        })
            .then((res) => {
                if(!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json()
            })
    }
}

export const deleteItemCart = (lockerId) => {
    return (dispatch) => {
        return fetch(api_url + "/delete-cart/" + lockerId, {
            method: "DELETE",
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded' },
        })
            .then((res) => {
                if(!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json()
            })
    }
}

