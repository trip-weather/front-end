import {useEffect, useState} from "react";
import HotelCard from "./HotelCard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Autoplay, Navigation} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {getSuggestedHotels, getSuggestedHotelsByLocation} from "../services/HotelService";
import {getCityFromLatLng, getUserLocation} from "../services/UserService";
import {CircularProgress} from "@mui/material";

export default function SuggestHotelsSection() {

    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState(null);


    // useEffect(() => {
    //     const fetchUserLocation = async () => {
    //         try {
    //             const location = await getUserLocation();
    //             console.log(location);
    //             if (location !== null) {
    //                 const city = await getCityFromLatLng(location.latitude, location.longitude);
    //                 setCity(city);
    //                 console.log(city);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user location:', error);
    //         }
    //     };
    //
    //     fetchUserLocation();
    // }, []);
    //
    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         try {
    //             console.log(city)
    //             if (city !== null) {
    //                 console.log("inside if")
    //                 const response =  await getSuggestedHotelsByLocation(city);
    //                 console.log(response);
    //                 // setHotels(response.data);
    //             } else {
    //                 const response = await getSuggestedHotels();
    //                 setHotels(response.data);
    //             }
    //
    //         } catch (error) {
    //             console.log('Error fetching hotels:', error);
    //         }
    //     };
    //
    //     fetchHotels();
    // }, [city]);


    useEffect(() => {
        const fetchHotelsBasedOnLocation = async () => {
            try {
                const location = await getUserLocation();
                console.log(location);
                if (location !== null) {
                    const city = await getCityFromLatLng(location.latitude, location.longitude);
                    setCity(city);
                    console.log(city);

                    if (city !== null) {
                        console.log("inside if");
                        const response = await getSuggestedHotelsByLocation(city);
                        console.log("hotels",response);
                        console.log("hotels",response.data[0].results);
                        setHotels(response.data[0].results);
                        console.log(hotels)
                    }
                } else {
                    const suggestedHotels = (await getSuggestedHotels()).data;
                    console.log(suggestedHotels);
                    setHotels(suggestedHotels);
                }
            } catch (error) {
                console.error('Error fetching user location:', error);
            }
        };

        fetchHotelsBasedOnLocation();
    }, []);


    return (
        <>
           <Box sx={{backgroundColor: '#f5f5f5', padding: '40px 0'}}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Suggested based on your location and time frame
                    </Typography>
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        effect="cards"
                        speed={1000}
                        navigation={true}
                        autoplay={{delay: 1200, disableOnInteraction: false}}
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
                            <SwiperSlide key={hotel.id}>
                                <HotelCard hotel={hotel} sx={{maxWidth: 345}}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Container>
            </Box>
        </>
    )
}