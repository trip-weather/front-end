import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
import {getAuthToken} from "./AuthServicce";

export const getSingleHotel = (id, checkIn, checkOut, nearby) => {
    let url = `${API_URL_FULL}/hotel/${id}?checkIn=${checkIn}&checkOut=${checkOut}`

    if (nearby !== null ){
        url += `&nearby=${nearby}`
    }

    return axios({
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },
        url: url,
    });
};

export const getSuggestedHotels = () => {
    return axios.get(`${API_URL_FULL}/hotels/suggested`)
}
export const getSuggestedHotelsByLocation = (city) => {
    return axios.get(`${API_URL_FULL}/hotels/suggested-by-location?city=${city}`)
}

export const searchHotels = (data) => {
    return axios.get(`${API_URL_FULL}/search`, {params: data})
}

export const makeReservation = (externalId, amount, checkInDate, checkOutDate) => {
    return axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_FULL}/hotel/create-verification-session?id=${externalId}&amount=${amount}&check_in=${checkInDate}&check_out=${checkOutDate}`,
    })
}

export const getReservedHotelByExternalId = (externalId) => {
    return axios({
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_FULL}/user/reservation/hotel/${externalId}`
    })
}