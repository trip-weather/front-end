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
    suggestedFlightTicketsSection: {
        padding: '3.5rem 0',
        background: 'rgba(0, 0, 0, .05)'
    },
    suggestedFlightTicketsSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(0, 'auto'),
        width: 'min(800px, 100%)',
    },
    suggestedFlightTicketsHeading: {
      fontWeight: 600,
      textAlign: 'center',
      marginBottom: '3.2rem'
    },
    suggestedFlightTicketsWarning: {
        padding: '2rem 1.8rem',
        color: '#b2102f',
        textDecoration: 'underline'
        // backgroundColor: '#b2102f'
    },
    tickets: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.2rem',
      alignItems: 'center',
      marginBottom: '5rem'
    },
    paper: {
        // padding: theme.spacing(3),
        padding: '.8rem .6rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #D0B8A8 40%, #85586F 90%)',
        // color: 'white',
        boxShadow: theme.shadows[5],
    },
    paperContainer: {
        background: '#fff',
        borderRadius: '6px',
        padding: '.7rem .8rem',
    },

    mainInfo: {
        fontWeight: 'bold',
        // fontSize: '1.8rem',
        fontSize: '2.3rem',
        color: '#357a38',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2),
// #4caf50 #357a38 #6fbf73
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
    // TODO based on the order status display different cases
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const orderUuid = queryParams.get('order_uuid');
    const classes = useStyles();


    const [flights, setFlights] = useState([]);

    const [reservation, setReservation] = useState(null);
    const [isCheapestChecked, setIsCheapestChecked] = useState(true);
    const [isMostExpensiveChecked, setIsMostExpensiveChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [isUserLocationEnabled, setIsUserLocationEnabled] = useState(false);
    const [isFlightTicketLoading, setFlightTicketLoading] = useState(false);

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
        setIsUserLocationEnabled(false);
        try {

            const location = await getUserLocation();
            if (location !== null) {

                setIsUserLocationEnabled(true);
                const city = await getCityFromLatLng(location.latitude, location.longitude);
                setCity(city);

                const params = {
                    departDate: payment.checkInDate,
                    returnDate: payment.checkOutDate,
                    origin: payment.city,
                    destination: 'London',
                    adults: 2
                };

                setFlightTicketLoading(true);
                const response = await getFlightTicketsByDirections(params);
                setFlights(response.data.data);
                setFlightTicketLoading(false);
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
                            <div className={classes.paperContainer}>
                                <Typography variant="h4" className={classes.mainInfo}>
                                    Reservation Successful!
                                </Typography>
                                <Typography variant="body1" className={classes.otherInfo}>
                                    Congratulations! You have successfully made your reservation
                                    for <span><b>{reservation.hotelName}</b></span> in <span><b>{reservation.city}</b></span>.
                                </Typography>
                                <Typography variant="body1" className={classes.otherInfo}>
                                    Check-in Date: <b>{reservation.checkInDate} </b>
                                </Typography>
                                <Typography variant="body1" className={classes.otherInfo}>
                                    Check-out Date: <b> {reservation.checkOutDate} </b>
                                </Typography>
                                <Typography variant="body1" className={classes.mainInfo}>
                                    Total Price: <span>{reservation.price}</span>
                                </Typography>
                                <Typography variant="body2" className={classes.otherInfo}>
                                    <i>
                                        We are looking forward to welcoming you to our hotel. If you have any questions or need assistance, please feel free to contact us.
                                    </i>
                                </Typography>
                            </div>
                        </Paper>
                    </div>
                    <div className={classes.optionContainer}>
                        {/*<FormGroup>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={*/}
                        {/*            <Checkbox*/}
                        {/*                checked={isCheapestChecked}*/}
                        {/*                onChange={handleCheapestClick}*/}
                        {/*            />*/}
                        {/*        }*/}
                        {/*        label="Cheapest"*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}
                        {/*<FormGroup>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={*/}
                        {/*            <Checkbox*/}
                        {/*                checked={isMostExpensiveChecked}*/}
                        {/*                onChange={handleMostExpensiveClick}*/}
                        {/*            />*/}
                        {/*        }*/}
                        {/*        label="Most Expensive"*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}
                    </div>

                    <section className={classes.suggestedFlightTicketsSection}>
                        <div className={classes.suggestedFlightTicketsSectionContainer}>
                            <Typography className={classes.suggestedFlightTicketsHeading} variant='h3'> Suggested flight tickets </Typography>
                            {
                                (!isUserLocationEnabled && !isFlightTicketLoading) &&
                                <Typography className={classes.suggestedFlightTicketsWarning} align='center' variant='h5'> You should enable your browser location! </Typography>
                            }

                            {(isUserLocationEnabled && isFlightTicketLoading) &&
                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <CircularProgress/>
                                    <Typography variant="body2" color="textSecondary" component="span" style={{marginTop: 10}}>
                                        Fetching the most suitable flights for your
                                    </Typography>
                                </div>
                            }
                            {
                                (isUserLocationEnabled && !isFlightTicketLoading) && (
                                    <div className={classes.tickets}>
                                        {flights.map((flight, index) => (
                                            <FlightTicketCard key={index} flights={flight}/>
                                        ))}
                                    </div>)
                            }
                        </div>
                    </section>
                </>
            }


        </div>

    );
};

export default PaymentOutcome;