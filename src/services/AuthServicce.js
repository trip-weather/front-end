import jwt_decode from "jwt-decode";
import {API_URL_FULL, JWT_LOCAL_STORAGE_KEY} from "../shared/constants";
import axios from "axios";


export const storeAuthToken = (token) => {
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
};


export const removeAuthToken = () => localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);

export const getAuthToken = () => localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

export const checkIsUserAuthenticated = () => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token === null) return false;

    const decoded = jwt_decode(token);
    const currentTimeInSeconds = (new Date()).getTime() / 1000;

    return currentTimeInSeconds < decoded.exp;
};

export const getUserUuid = () => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token === null) return "";

    const decoded = jwt_decode(token);
    return decoded.uuid;
};

export const getUserRole = () => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token === null) return "";

    const decoded = jwt_decode(token);
    return decoded.auth;
};

export const getUserName = () => {

    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token === null) return "";

    const decoded = jwt_decode(token);
    return decoded.sub;
};

export const getLikedHotels = async () => {
    if (!checkIsUserAuthenticated()) {
        return [];
    }

    const response = await axios({
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
            Authorization: 'Bearer ' + getAuthToken()
        },

        url: `${API_URL_FULL}/user/favourite-hotels`,
    });

    return response.data;
};

export const getUserReservations = async () => {
    if(!checkIsUserAuthenticated()) return [];

    try {
        const response = await axios({
            method: 'get',
            headers: {
                Authorization: 'Bearer ' + getAuthToken(),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            url: `${API_URL_FULL}/user/reservations/hotel`,
        });

        console.debug(response.data);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const getUpdateAuthState = () => {
    // const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    // if( token === null) return AuthDefaults;

    // const decoded = jwt_decode(token);
    // const auth = { ...AuthDefaults, user: { ...AuthDefaults.user } };

    // console.log(decoded, auth);
    // auth.user.username = decoded.username;
    // auth.user.role = decoded.role;
    // // auth.user.id = decoded.id;
    // auth.isAuthenticated = true;

    // console.log(auth);
    // return auth;
};

