import Card from "@mui/material/Card";
import {Button, Collapse} from "@mui/material";
import React, {useState} from "react";
import {bookFlight} from "../services/FlightTicketService";
import {format, parseISO} from "date-fns";
import '../css/flight-ticket-card.css'
import airplane from '../resources/airplane-icon.png'

const FlightTicketCard = ({flights}) => {
        const [expanded, setExpanded] = useState(false);

        function handleBookFlight() {
            const data = {
                amount: flights.totalAmount,
                outgoingFlight: {
                    departingAt: flights.slices[0].segments[0]?.departingAt,
                    arrivingAt: flights.slices[0].segments[0]?.arrivingAt
                },
                incomingFlight: {
                    departingAt: flights.slices[1].segments[0]?.departingAt,
                    arrivingAt: flights.slices[1].segments[0]?.arrivingAt
                },
                from: flights.slices[0].origin.name,
                to: flights.slices[0].destination.name
            }

            bookFlight(data)
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
            <div className='flight-ticker-card-wrapper'>
                <div className='flight-ticker-card-header'>
                    <h2>
                        {`${flights.totalAmount} ${flights.currency}`}
                    </h2>
                    <Button
                        sx={{px: '2.5rem', fontSize: '1.1rem'}}
                        onClick={() => handleBookFlight()}
                        variant="contained" style={{backgroundColor: '#85586F'}}>Book
                    </Button>
                </div>
                {flights.slices.map((flight, index) => {
                        return <>
                            <Card onClick={() => setExpanded(!expanded)} key={index} className='flight-ticket-card'>
                                <div className='flight-ticker-card-info-header'>
                                    <span>
                                        <img src={airplane} alt='airplane icon'/>
                                        <h3>{`${format(parseISO(flight.segments[0]?.departingAt), "HH:mm")} - ${format(parseISO(flight.segments[0]?.arrivingAt), "HH:mm")}`}</h3>
                                    </span>
                                    <div>
                                        <h2> {`${flight.origin.iataCode} - ${flight.destination.iataCode}`}</h2>
                                        <p> {formatTimeDuration(flight.duration)}</p>
                                    </div>
                                </div>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <div className='flight-ticker-card-content-container'>
                                        <div>
                                            <div className='flight-ticker-card-info'>
                                                <div className="ornament"></div>
                                                <span className="date-info">
                                                    {format(new Date(flight.segments[0]?.arrivingAt), "EEE, d MMM yyyy. HH:mm")}
                                                </span>
                                                <span className="airport-info"> Depart from {flight.origin.name} </span>
                                            </div>
                                            <div className='flight-ticker-card-info'>
                                                <div className="ornament"></div>
                                                <span className="date-info">
                                                    {format(new Date(flight.segments[0]?.departingAt), "EEE, d MMM yyyy. HH:mm")}
                                                </span>
                                                <span className="airport-info"> Arrive at {flight.destination.name} </span>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </Card>
                        </>
                    }
                )}
            </div>
        );
    }
;

export default FlightTicketCard;