import React, {useEffect} from 'react';
// import {makeStyles} from '@material-ui/core/styles';
// import { createTheme } from '@material-ui/core/styles'
import {Typography, Button, Grid, Paper, Card, CardMedia, CardContent} from '@material-ui/core';
import {useParams} from "react-router-dom";
import {getSingleHotel} from "../services/HotelService";


// const useStyles = createTheme((theme) => ({
//     root: {
//         margin: 'auto',
//         maxWidth: 600,
//         padding: theme.spacing(2),
//     },
//     image: {
//         height: 300,
//         objectFit: 'cover',
//     },
// }));

export default  function SingleHotelPage() {
    // const classes = useStyles();
    const classes = {};

    const { id } = useParams();

    const hotel = {
        name: 'Hotel Example',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        photos: [
            '/path/to/photo1.jpg',
            '/path/to/photo2.jpg',
            '/path/to/photo3.jpg',
            '/path/to/photo4.jpg',
        ],
        website: 'https://www.example.com',
        contactNumber: '+1234567890',
        address: '123 Hotel Street, City, Country',
    };

    useEffect(() => {
        getSingleHotel(id)
            .then(response => { console.log(response); })
            .catch((error) => { console.error(error) });
    }, [])

    return (

        <Paper className={classes.root}>
            <Typography variant="h5" gutterBottom>
                {hotel.name}
            </Typography>
            <Typography variant="body1">{hotel.description}</Typography>

            <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Typography variant="h6">Photo Gallery</Typography>
                </Grid>
                {hotel.photos.map((photo, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card>
                            <CardMedia className={classes.image} image={photo} title={`Photo ${index + 1}`}/>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                    <Typography variant="h6">Additional Information</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Website:</strong> <a href={hotel.website}>{hotel.website}</a>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Contact Number:</strong> {hotel.contactNumber}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Address:</strong> {hotel.address}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} justify="center">
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" fullWidth>
                        Book Now
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outlined" color="primary" fullWidth>
                        Contact
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
};