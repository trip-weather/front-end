import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import { Grid } from "@mui/material";
import axios from 'axios';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export default function SuggestHotelsSection() {

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/suggested-hotels');
                setHotels(response.data);
            } catch (error) {
                console.log('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);


    return (
        <>
            <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Suggested based on your location and time frame
                    </Typography>
                    <Grid container spacing={5} sx={{ paddingLeft: 20, paddingRight: 20 }}>
                        {/* 12 / 5 */}
                        {hotels.map((hotel) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
                                <HotelCard key={hotel.id} hotel={hotel} sx={{ maxWidth: 345 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

        </>
    )
}