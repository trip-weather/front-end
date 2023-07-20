import { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import axios from 'axios';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Autoplay, Navigation  } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { API_URL_FULL} from "../shared/constants";

export default function SuggestHotelsSection() {

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`${API_URL_FULL}/suggested-hotels`); // TODO move to separate service (there should be no single fetches)
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
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        effect="cards"
                        speed={1000}
                        navigation={true}
                        autoplay={{ delay: 1200, disableOnInteraction: false }}
                        loop
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 25,
                            },
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 40,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                        }}
                    >
                        {hotels.map((hotel) => (
                            <SwiperSlide>
                                <HotelCard key={hotel.id} hotel={hotel} sx={{ maxWidth: 345 }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>
        </>
    )
}