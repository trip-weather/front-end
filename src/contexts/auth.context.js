import { createContext } from "react";
import { checkIsUserAuthenticated, getUserUuid, getUserRole, getUserName } from "../services/AuthServicce";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        id: getUserUuid(),
        role: getUserRole()
        // username: getUserName()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;