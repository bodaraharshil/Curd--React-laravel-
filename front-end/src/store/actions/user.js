import axios from "axios";

export function setLoggedIn() {
    return dispatch => {
        dispatch({
            type: 'SET_LOGGED_IN'
        })
    }
}

export function userRegister(user, history) {
    return (dispatch) => {
        return axios.post(`http://127.0.0.1:8000/api/adduser`, user,{headers: { 'content-type': 'application/json' }})
            .then(response => {
                dispatch({
                    type: 'USER_SUCCESS',
                    message: response.data.message,
                    status: response.data.status
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USER_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}


export function userGet() {
    return (dispatch) => {
        return axios.get(`http://127.0.0.1:8000/api/alluser`)
            .then(response => {
                dispatch({
                    type: 'USERGET_SUCCESS',
                    message: "user get list success",
                    data:response.data,
                })
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERGET_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function userDelete(id, history) {
    return (dispatch) => {
        return axios.get(`http://127.0.0.1:8000/api/deleteuser/${id}`)
            .then(response => {
                dispatch({
                    type: 'USERDELETE_SUCCESS',
                    message: "user delete success",
                })
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERDELETE_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function userUpdate(id, data, history) {
    return (dispatch) => {
        return axios.post(`http://127.0.0.1:8000/api/updateuser/${id}`, data, {headers:{'Content-Type': 'application/json'}})
            .then(response => {
                dispatch({
                    type: 'USERUPDATE_SUCCESS',
                    message: "data updated success..",
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERUPDATE_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

