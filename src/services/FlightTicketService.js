import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
import {getAuthToken} from "./AuthServicce";

export const getFlightTicketsByDirections = (data) => {
    const params = Object.keys(data).reduce((acc, key) => {
        acc.push(`${key}=${data[key]}`);
        return acc;
    }, []);

    return axios({
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },
        url: `${API_URL_FULL}/flights?${params.join('&')}`,
    });
};

export const bookFlight = (data) => {
    return axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        data,
        url: `${API_URL_FULL}/flight/create-verification-session`,
    })
}