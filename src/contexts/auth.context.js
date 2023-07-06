import { createContext } from "react";
import { checkIsUserAuthenticated, getUserId, getUserRole, getUserName } from "../services/AuthServicce";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        // id: getUserId(),
        role: getUserRole()
        // username: getUserName()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;