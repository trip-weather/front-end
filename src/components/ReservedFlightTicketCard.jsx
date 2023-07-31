import '../css/reserved-flight-ticket-card.css'

const ReservedFlightTicketCard = ({flight}) => {
    return (
        <div className="flight-card">
            <div className="flight-header">
                <h3 className="title">Flight Information</h3>
            </div>
            <div className="flight-details">
                <p className="airport-info">From: {flight.from}</p>
                <p className="airport-info">To: {flight.to}</p>
                <p className="airport-info">Departing At: {flight.departingAt}</p>
                <p className="airport-info">Arriving At: {flight.arrivingAt}</p>
                <p className="price">
                    Price: {flight.currency} {flight.price}
                </p>
                <p>Reservation Date: {flight.reservationDate}</p>
            </div>
        </div>
    );
}

export default ReservedFlightTicketCard;