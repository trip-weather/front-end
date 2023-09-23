import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import NotificationContext from "../contexts/notification.context";
import {activateProfile} from "../services/UserService";

export default function ActivateProfile() {
    const navigate = useNavigate();
    const {notification, setNotification} = useContext(NotificationContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('key');

    useEffect(() => {
        activateProfile(key)
            .then((response) => {
                setNotification({message: 'Successful activated profile!', active: true, severity: 'success'});
                navigate('/sign-in')
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
}