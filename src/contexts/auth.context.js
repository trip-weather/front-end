import { createContext } from "react";
import {
    checkIsUserAuthenticated,
    getUserUuid,
    getUserRole,
    getLikedHotels,
    getUserReservations
} from "../services/AuthServicce";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        id: getUserUuid(),
        role: getUserRole(),
        liked: await getLikedHotels(),
        reserved: await getUserReservations()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;