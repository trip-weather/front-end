import axios from "axios";
import {API_URL_FULL, GOOGLE_MAPS_API_KEY} from "../shared/constants";
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
            url: `${API_URL_FULL}/account/activate`,
            params: {key}
        }
    )
}

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude, position.coords.longitude)
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    resolve(null);
                }
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
}

export const getCityFromLatLng = (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.results && data.results.length > 0) {
                // Extract the city name from the address components
                const addressComponents = data.results[0].address_components;
                const cityComponent = addressComponents.find(
                    (component) => component.types.includes('locality')
                );
                return cityComponent ? cityComponent.long_name : null;
            } else {
                return null;
            }
        })
        .catch((error) => {
            console.error('Error fetching city:', error);
            return null;
        });
}

export const likeHotel = async (id) => {
    return axios({
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `${API_URL_FULL}/hotel/${id}/like`,
    })
}
export const unlikeHotel = async (id) => {
    return await axios.delete(`${API_URL_FULL}/hotel/${id}/unlike`, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}

export const getUserReservedHotels = (status) => {
    return axios.get(`${API_URL_FULL}/user/profile/reservations/hotel?status=${status}`, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}

export const getUserReservedFlights = (status) => {
    return axios.get(`${API_URL_FULL}/user/profile/reservations/flight-tickets?status=${status}`, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    });
}