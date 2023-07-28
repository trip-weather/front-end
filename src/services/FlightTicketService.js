import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
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
