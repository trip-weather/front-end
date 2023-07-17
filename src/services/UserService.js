import axios from "axios";
import {API_URL, API_URL_FULL} from "../shared/constants";

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

