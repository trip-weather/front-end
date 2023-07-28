import { createContext } from "react";
import {
    checkIsUserAuthenticated,
    getUserUuid,
    getUserRole,
    getUserName,
    getLikedHotels
} from "../services/AuthServicce";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        id: getUserUuid(),
        role: getUserRole(),
        liked: await getLikedHotels()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;