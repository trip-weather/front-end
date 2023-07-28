import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Typography} from "@material-ui/core";
import {Button, Collapse, Step, StepContent, StepLabel, Stepper} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import CardHeader from "@mui/material/CardHeader";
import {useState} from "react";
import {ExpandMore} from "@mui/icons-material";
import Box from "@mui/material/Box";

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

    return (
        <div>
            <Typography variant="body1" className={classes.price}>
                {`${flights.totalAmount} ${flights.currency}`}
            </Typography>

            {flights.slices.map((flight, index) => {

                    return (<Card key={index} className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <div>
                                <div>
                                    <span> { flight.segments[0].departingAt } </span>
                                    <span> { flight.segments[0].arrivingAt } </span>
                                </div>
                                <span> {`${flight.origin.iataCode} - ${flight.destination.iataCode}`}</span>
                                <span> { flight.duration }</span>
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
                                        <StepLabel style={{display: 'flex' }}>
                                            <div style={{ marginLeft: '2rem'}}>
                                                <div> { flight.segments[0]?.arrivingAt } </div>
                                                <div> Depart from { flight.origin.name } </div>
                                            </div>
                                        </StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel>
                                            <div style={{ marginLeft: '2rem'}}>
                                                <div> { flight.segments[0]?.arrivingAt } </div>
                                                <div> Arrive at { flight.destination.name } </div>
                                            </div>
                                        </StepLabel>
                                    </Step>

                                </Stepper>
                            </CardContent>
                        </Collapse>
                    </Card>)
                }
            )}


        </div>


    );
};

export default FlightTicketCard;