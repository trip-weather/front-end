import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getCityFromLatLng, getUserLocation} from "../services/UserService";
import FlightTicketCard from "../components/FlightTicketCard";
import FormControlLabel from "@mui/material/FormControlLabel";
import {CircularProgress, FormGroup} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {getPaymentInfo} from "../services/PaymentService";
import {getFlightTicketsByDirections} from "../services/FlightTicketService";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(10, 'auto'),
        maxWidth: 800,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        background: 'linear-gradient(180deg, #D0B8A8 40%, #85586F 90%)',
        color: 'white',
        boxShadow: theme.shadows[5],
    },
    mainInfo: {
        fontWeight: 'bold',
        fontSize: '1.8rem',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    otherInfo: {
        fontSize: '1.2rem',
        marginBottom: theme.spacing(1.5),
    },
    optionContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    option: {
        cursor: 'pointer',
        textDecoration: 'underline',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
}));
const PaymentOutcome = () => {
    // TODO retrieve the order id from the url
    // TODO send a request to the backend to acquire the data
    // TODO based on the order status display different cases
    // TODO get user location and only if he allows show the flight tickets

    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const orderUuid = queryParams.get('order_uuid');
    const classes = useStyles();

    const [showFlightTicket, setShowFlightTicket] = useState(false);
    const [flights, setFlights] = useState([]);

    const [reservation, setReservation] = useState(null);
    const [isCheapestChecked, setIsCheapestChecked] = useState(true);
    const [isMostExpensiveChecked, setIsMostExpensiveChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState(null);

    const handleCheapestClick = () => {
        setIsCheapestChecked(true);
        setIsMostExpensiveChecked(false);
        // TODO: Handle sorting flights by cheapest
        console.log('Sort by cheapest flights');
    };

    const handleMostExpensiveClick = () => {
        setIsCheapestChecked(false);
        setIsMostExpensiveChecked(true);
        // TODO: Handle sorting flights by most expensive
        console.log('Sort by most expensive flights');
    };

    const fetchUserLocation = async (payment) => {
        try {
            const location = await getUserLocation();

            console.log(location);
            if (location !== null) {
                const city = await getCityFromLatLng(location.latitude, location.longitude);
                setCity(city);
                const params = {
                    departDate: payment.checkInDate,
                    returnDate: payment.checkOutDate,
                    origin: payment.city,
                    destination: 'London',
                    adults: 2
                };

                const response = await getFlightTicketsByDirections(params);
                setFlights(response.data.data);
                setShowFlightTicket(true);

                console.log(response.data);
            } else {
                // TODO
                setShowFlightTicket(false);
            }
        } catch (error) {
            console.error('Error fetching user location:', error);
        }
    };


    useEffect( () => {
        setIsLoading(true);
        const fetchReservation = async () => {
            try {
                const payment = await getPaymentInfo(orderUuid);
                setReservation(payment.data);
                setIsLoading(false);

                await fetchUserLocation(payment.data);
            }
            catch (error) {
                setIsLoading(false);
            }




                // .then((response) => {
                //     console.log(response.data)
                //     console.log(response.data.hotelName)
                //     setReservation(response.data);
                //     setIsLoading(false);
                // })
                // .catch(error => {
                //     console.log(error);
                //     setIsLoading(false);
                // })
            // .finally(() => setIsLoading(false))


        };
        fetchReservation();
    }, []);


    useEffect(() => {}, []);

    const flightData = [
        {
            id: 1,
            airline: 'Airline A',
            departureCity: 'City X',
            arrivalCity: 'City Y',
            departureTime: '08:00 AM',
            arrivalTime: '10:30 AM',
            price: 150,
        }
    ];

    return (
        <div>
            {isLoading &&
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <CircularProgress/>
                    <Typography variant="body2" color="textSecondary" component="span" style={{marginTop: 10}}>
                        Checking your payment status
                    </Typography>
                </div>
            }
            {!isLoading &&
                <>
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Typography variant="h4" className={classes.mainInfo}>
                                Reservation Successful!
                            </Typography>
                            <Typography variant="body1" className={classes.otherInfo}>
                                Congratulations! You have successfully made your reservation
                                for <span>{reservation.hotelName}</span> in <span>{reservation.city}</span>.
                            </Typography>
                            <Typography variant="body1" className={classes.otherInfo}>
                                Check-in Date: {reservation.checkInDate}
                            </Typography>
                            <Typography variant="body1" className={classes.otherInfo}>
                                Check-out Date: {reservation.checkOutDate}
                            </Typography>
                            <Typography variant="body1" className={classes.mainInfo}>
                                Total Price: <span>{reservation.price}</span>
                            </Typography>
                            <Typography variant="body2" className={classes.otherInfo}>
                                We are looking forward to welcoming you to our hotel. If you have any questions or need
                                assistance,
                                please feel free to contact us.
                            </Typography>
                        </Paper>
                    </div>
                    <div className={classes.optionContainer}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isCheapestChecked}
                                        onChange={handleCheapestClick}
                                    />
                                }
                                label="Cheapest"
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isMostExpensiveChecked}
                                        onChange={handleMostExpensiveClick}
                                    />
                                }
                                label="Most Expensive"
                            />
                        </FormGroup>
                    </div>
                    {showFlightTicket && (
                        <div className={classes.root}>
                            {/*<Paper className={classes.paper}>*/}
                            {flights.map((flight, index) => (
                                <FlightTicketCard key={index} flights={flight}/>
                            ))}
                            {/*</Paper>*/}
                        </div>
                    )}
                </>
            }


        </div>

    );
};

export default PaymentOutcome;