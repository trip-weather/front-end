import axios from "axios";
import { removeAuthToken } from "./AuthServicce";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";


export const loginUser = (data) => {
    console.log(data.get('remember'));

    return axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },

        url: 'http://localhost:8080/api/authenticate',
        data: {
            username: data.get('email'),
            password: data.get('password'),
            remember: data.get('remember'),
        }
    });
};

