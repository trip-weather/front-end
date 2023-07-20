import axios from "axios";
import {API_URL_FULL} from "../shared/constants";

export const getSingleHotel = (id, checkIn, checkOut) => {
    return axios({
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },
        url: `${API_URL_FULL}/hotel/${id}?checkIn=${checkIn}&checkOut=${checkOut}`,
    });
};

export const getSuggestedHotels = () => {
    return axios.get(`${API_URL_FULL}/suggested-hotels`)
}

export const searchHotels = (data) => {
    return  axios.get(`${API_URL_FULL}/search`, {params: data})
}