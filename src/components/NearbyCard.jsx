import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

const StyledCard = styled(Card)(({theme}) => ({
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    padding: '16px',
    marginTop: '16px',
}));

const HotelItem = styled('div')(({theme}) => ({
    marginBottom: '8px',
    '&:last-child': {
        marginBottom: 0,
    },
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const HotelName = styled(Typography)(({theme}) => ({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2E3A59',
}));

const HotelAddress = styled(Typography)(({theme}) => ({
    color: '#6B6B6B',
}));

const HotelRating = styled(Typography)(({theme}) => ({
    color: '#FFC107',
    fontWeight: 'bold',
}));

const NearbyCard = ({nearby}) => {
    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    There are {nearby.length} hotels nearby to you:
                </Typography>
                {nearby.map((filter) => (
                    <HotelItem key={filter.id}>
                        <HotelName variant="h6" component="h3">
                            {filter.name}
                        </HotelName>
                        <HotelAddress variant="body1" color="textSecondary">
                            {filter.address}
                        </HotelAddress>
                        <HotelRating variant="body2" color="textSecondary">
                            Rating: {filter.rating}
                        </HotelRating>
                    </HotelItem>
                ))}
            </CardContent>
        </StyledCard>
    );
};

export default NearbyCard;