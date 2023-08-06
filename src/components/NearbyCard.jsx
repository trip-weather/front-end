import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";


const StyledCard = styled(Card)(({theme}) => ({
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    padding: '16px',
    marginTop: '16px',
    width: '20rem',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
}));

const HotelItem = styled('div')(({theme}) => ({
    marginBottom: '2rem',
    '&:last-child': {
        marginBottom: 0,
    },
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const ShowMoreButton = styled(Button)(({theme}) => ({
    backgroundColor: '#85586F',
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderRadius: '20px',
    padding: '8px 16px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#663E4B',
    },
}));


const NearbyCard = ({filter, nearby, hotelLatitude, hotelLongitude}) => {
    const [showMore, setShowMore] = useState(false);
    const itemsToShow = showMore ? nearby : nearby.slice(0, 3);
    const handleShowMore = () => {
        setShowMore((prevShowMore) => !prevShowMore);
    };
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const point1 = new window.google.maps.LatLng(lat1, lon1);
        const point2 = new window.google.maps.LatLng(lat2, lon2);
        return window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    There are {nearby.length} {filter} nearby to you:
                </Typography>
                {itemsToShow.map((filter) => {

                    console.log(filter.geometry.location.latitude);
                    const distance = calculateDistance(
                        hotelLatitude,
                        hotelLongitude,
                        filter.geometry.location.latitude,
                        filter.geometry.location.longitude
                    );

                    return (
                        <HotelItem key={filter.id}>
                            <Typography style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#2E3A59',
                                textDecoration: 'underline'
                            }}>
                                {filter.name}
                            </Typography>
                            <Typography style={{color: '#6B6B6B'}}>
                                {filter.address}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <span style={{color: '#FFC107', fontWeight: 'bold'}}>Rating: </span>
                                <span style={{fontWeight: 'bold', paddingLeft: '0.5rem'}}>{filter.rating}</span>
                            </Typography>
                            <Typography variant="body2">
                                <span style={{color: '#FFC107', fontWeight: 'bold'}}>Address: </span>
                                <span style={{fontWeight: 'bold', paddingLeft: '0.5rem'}}>{filter.vicinity}</span>
                            </Typography>
                            <Typography>
                                Distance: {distance.toFixed(0)} meters
                            </Typography>
                        </HotelItem>
                    )
                })}
                {nearby.length > 3 && (
                    <ShowMoreButton className="btn" onClick={handleShowMore}>
                        {showMore ? 'Show less' : 'Show more'}
                    </ShowMoreButton>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default NearbyCard;