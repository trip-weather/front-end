import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@material-ui/core";
import {Button, Collapse, Step, StepLabel, Stepper} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {ExpandMore} from "@mui/icons-material";
import {bookFlight} from "../services/FlightTicketService";
import {format, parseISO} from "date-fns";

const useStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        // margin: theme.spacing(4),
        // boxShadow: theme.shadows[5],
        // borderRadius: theme.spacing(1),
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    airlineName: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    flightDetails: {
        fontSize: '1rem',
        marginBottom: theme.spacing(1),
    },
    price: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    bookButton: {
        marginTop: theme.spacing(2),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderTopLeftRadius: theme.spacing(1),
        borderTopRightRadius: theme.spacing(1),
    },
}));

const FlightTicketCard = ({flights}) => {
        const classes = useStyles();

        const [expanded, setExpanded] = useState(false);

        function handleBookFlight(amount, departingAt, arrivingAt, from, to) {
            bookFlight(amount, departingAt, arrivingAt, from, to)
                .then(response => {
                    const sessionUrl = response.data;
                    console.log('Payment Session URL:', sessionUrl);
                    window.location.href = sessionUrl;
                })
                .catch(error => {
                    console.log('Error creating payment session:', error.response.data)
                })
        }


        const formatTimeDuration = (duration) => {
            // Use a regular expression to extract the hour and minute components
            const regex = /PT(\d+)H(\d+)M/;
            const match = duration.match(regex);

            if (match) {
                const hours = parseInt(match[1]);
                const minutes = parseInt(match[2]);

                // Format the components into "01h 59m" format
                const formattedDuration = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
                return formattedDuration;
            }

            // If the regular expression doesn't match, return the original duration string
            return duration;
        };


        return (
            <div>
                <Typography variant="body1" className={classes.price}>
                    {`${flights.totalAmount} ${flights.currency}`}
                </Typography>

                {flights.slices.map((flight, index) => {

                        return <>
                            <Card key={index} className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <div>
                                        <div>

                                            <span>{`${format(parseISO(flight.segments[0]?.departingAt), "HH:mm")} - ${format(parseISO(flight.segments[0]?.arrivingAt), "HH:mm")}`}</span>
                                            {/*<span>{format(parseISO(flight.segments[0]?.arrivingAt), "HH:mm")}</span>*/}
                                            {/*<span> {flight.segments[0].departingAt} </span>*/}
                                            {/*<span> {flight.segments[0].arrivingAt} </span>*/}
                                        </div>
                                        <span> {`${flight.origin.iataCode} - ${flight.destination.iataCode}`}</span>
                                        <span> {formatTimeDuration(flight.duration)}</span>
                                    </div>

                                    <ExpandMore
                                        expand={expanded}
                                        onClick={() => setExpanded(!expanded)}
                                    >
                                    </ExpandMore>
                                </CardContent>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Stepper alternativeLabel activeStep={2} orientation="vertical">
                                            <Step>
                                                <StepLabel style={{display: 'flex'}}>
                                                    <div style={{marginLeft: '2rem'}}>
                                                        <div> {flight.segments[0]?.arrivingAt} </div>
                                                        <div> Depart from {flight.origin.name} </div>
                                                    </div>
                                                </StepLabel>
                                            </Step>
                                            <Step>
                                                <StepLabel>
                                                    <div style={{marginLeft: '2rem'}}>
                                                        {/*<div> {flight.segments[0]?.departingAt} </div>*/}
                                                        {format(new Date(flight.segments[0]?.departingAt), "EEE, d MMM yyyy. HH:mm")}
                                                        <div> Arrive at {flight.destination.name} </div>
                                                    </div>
                                                </StepLabel>
                                            </Step>

                                        </Stepper>
                                    </CardContent>
                                </Collapse>
                            </Card>
                            <Button
                                onClick={() => handleBookFlight(flights.totalAmount, flight.segments[0]?.departingAt, flight.segments[0]?.arrivingAt, flight.origin.name, flight.destination.name)}
                                variant="contained" style={{backgroundColor: '#85586F'}}>Book
                            </Button>
                        </>

                    }
                )}

            </div>
        );
    }
;

export default FlightTicketCard;