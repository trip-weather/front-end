import jwt_decode from "jwt-decode";
import { JWT_LOCAL_STORAGE_KEY } from "../shared/constants";
// import { AuthDefaults } from "../contexts/auth.context";

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

// export const getUserId = () => {
//     const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
//     if (token === null) return "";

//     const decoded = jwt_decode(token);
//     return decoded.id;
// };

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



// не импортвай  AuthDefaults !!!!


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

