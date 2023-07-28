import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
import {getAuthToken} from "./AuthServicce";

export const getPaymentInfo = (uuid) => {

    return axios.get(`${API_URL_FULL}/order/${uuid}`, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
};