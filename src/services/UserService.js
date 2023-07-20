import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
import {getAuthToken, getUserUuid} from "./AuthServicce";


const userUuid = getUserUuid();
export const loginUser = (data) => {
    return axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },

        url: `${API_URL_FULL}/authenticate`,
        data: {
            username: data.get('email'),
            password: data.get('password'),
            remember: data.get('remember'),
        }
    });
};


export const updateUser = (data) => {

    return axios({
        method: 'patch',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_FULL}/user/${userUuid}/update`,
        data: {
            firstName: data.firstName,
            lastName: data.lastName
        }
    })
};

export const changePassword = (data) => {
    return axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_FULL}/account/change-password`,
        data: {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }
    })
}

export const getProfile = () => {

    return axios.get(`${API_URL_FULL}/user/${userUuid}/profile`, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
};

export const registerUser = (data) => {
    return axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json'
        },

        url: `${API_URL_FULL}/register`,
        data: {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            repeatedPassword: data.get('repeatedPassword'),
            firstName: data.get('firstName'),
            lastName: data.get('lastName')
        }
    })
}

export const forgottenPassword = (data) => {
    return axios({
        method: 'post',
        headers: {'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
        url: `${API_URL_FULL}/account/reset-password`,
        data: {
            email: data.get('email'),
        }
    })
}

export const resetPassword = (data, resetKey) => {
    return axios({
        method: 'post',
        headers: {'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
        url: `${API_URL_FULL}/account/reset-password/finish`,
        data: {
            newPassword: data.get('password'),
            key: resetKey
        }
    })
}

export const activateProfile = (key) => {
    return axios({
            method: "get",
            headers: {'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
            url: `${API_URL_FULL}/api/account/activate`,
            params: {key}
        }
    )
}