import * as React from 'react';
import ProductHeroLayout from './ProductHeroLayout';
import {Button} from "@mui/material";
import {Typography} from "@material-ui/core";
// import '../css/not-found-page.css';
// import backgroundImage from '../home/components/background.jpg'


const backgroundImage =
    'https://images.unsplash.com/photo-1619897917857-f80c6adcf760?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80';
// const backgroundImage =
//     'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80';
// const backgroundImage =
//     'https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80';

export default function ProductHero() {
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9',
                backgroundPosition: 'center',
            }}
        >
            <img
                style={{display: 'none'}}
                src={backgroundImage}
                alt="increase priority"
            />
            {/*<div className='product-hero'>*/}
            <Typography color="inherit" align="center" variant="h2" marked="center">
                Welcome to WeatherTrip!
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{mb: 4, mt: {xs: 4, sm: 10}}}
            >
                Are you planning your next vacation but can't decide where to go?
            </Typography>
            <Button
                style={{marginTop: '2rem', backgroundColor: '#85586F'}}
                // color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/search"
                sx={{minWidth: 200}}
            >
                Explore
            </Button>
            <Typography variant="body2" color="inherit" sx={{mt: 2}}>
                Discover the experience
            </Typography>
            {/*</div>*/}
        </ProductHeroLayout>
    );
}