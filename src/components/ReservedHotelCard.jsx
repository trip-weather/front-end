import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../css/reserved-hotel-card.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useNavigate} from "react-router-dom";

const ReservedHotelCard = ({id, hotelName, city, imageUrl}) => {
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/hotel/${id}?nearby=`)} className="reserved-hotel-card">
            <CardActionArea className="card-action-area">
                <CardMedia className="hotel-image" image={imageUrl} title={hotelName}/>
                <CardContent className="hotel-content">
                    <Typography variant="h5" className="hotel-name">
                        {hotelName}
                    </Typography>
                    <Typography variant="subtitle1" className="city">
                        <LocationOnIcon/> {city}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ReservedHotelCard;