import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import axios from "axios";
import NotificationContext from "../contexts/notification.context";

export default function ActivateProfile() {
    const navigate = useNavigate();
    const { notification, setNotification } = useContext(NotificationContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const key = queryParams.get('key');

    useEffect(() => {
        axios({
                method: "get",
                headers: {'Access-Control-Allow-Origin': '*', "Content-Type": 'application/json'},
                url: 'http://localhost:8080/api/account/activate',
                params: { key }
            }
        ).then((response) => {
            setNotification({message: 'Successful activated profile!', active: true, severity: 'success'});
            navigate('/sign-in')
        })
            .catch((error) => {
                console.log(error);
            });
    },[])
}