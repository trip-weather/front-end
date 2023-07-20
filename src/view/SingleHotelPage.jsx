import React, {useContext, useEffect, useState} from 'react';
import {Button, CircularProgress, Typography} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getSingleHotel} from "../services/HotelService";
import {useLocation, useParams} from "react-router-dom";
import '../css/single-hotel-page.css'
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import AuthContext from "../contexts/auth.context";

const SinglePoster = ({}) => {

    const {id} = useParams();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const checkinDate = queryParams.get('checkIn');
    const checkoutDate = queryParams.get('checkOut');

    const [isLoading, setIsLoading] = useState(true);
    const [hotelData, setHotelData] = useState();
    const [isLiked, setIsLiked] = useState(false);

    const { userAuth } = useContext(AuthContext);

    useEffect(() => {
        getSingleHotel(id, checkinDate, checkoutDate)
            .then(response => {
                setHotelData(response.data);
                setIsLoading(false);
                const liked = userAuth.isAuthenticated && userAuth.user.liked.includes(response.data.hotelId);
                setIsLiked(liked);
                console.log(userAuth.user.liked);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }, []);

    const toggleLikedHotel = () => {
        // TODO

        setIsLiked((oldValue) => !oldValue);
    }

    return (
        <>
            { isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            }
            { !isLoading &&
                <div className='single-hotel-view-content-wrapper'>
                    <div className="single-hotel-view-content-container">
                        <div className='single-hotel-view-header'>
                            <div>
                                <Typography className='single-hotel-view-period'> { `${hotelData.arrivalDate} - ${hotelData.departureDate}` } </Typography>
                                <h2 className='hotel-view-name'> { hotelData.name } </h2>
                            </div>

                            {/* TODO in order to check if it's liked user should be logged in */}
                            <Button variant="outlined" onClick={toggleLikedHotel}
                                    endIcon={ isLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}>
                                <span> {isLiked ? 'Добавена в любими' : 'Добави в любими'} </span>
                            </Button>
                        </div>
                        <div className='single-hotel-view-content'>
                            <div className="single-hotel-pictures-container">
                                <div className="single-hotel-main-picture-swiper">
                                    <Swiper
                                        modules={[Autoplay, Pagination]}
                                        style={{height: '100%'}}
                                        effect="cards"
                                        // speed={2500}
                                        pagination={true}
                                        loop={false}
                                        autoplay={{delay: 500000, disableOnInteraction: false}}
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
                                        breakpoints={{
                                            768: {
                                                slidesPerView: 1,
                                                spaceBetween: 50,
                                            },
                                        }}
                                    >
                                        {hotelData.photos.map((photo, index) => (
                                            <SwiperSlide style={{height: '100%'}} id={index}>
                                                <img src={photo.urlMax}
                                                     style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="single-hotel-secondary-pictures-container">
                                    {
                                        hotelData.photos.filter((_, index) => (index >= 1 && index < 5))
                                            .map((photo, index) => (
                                                    <div className="single-hotel-secondary-picture" >
                                                        <img key={index} style={{width: '100%', height: '100%', objectFit: 'cover'}} src={photo.urlMax} />
                                                    </div>
                                                ))
                                    }
                                </div>
                            </div>
                            <div className="single-hotel-description-container">
                                <p className="single-hotel-description">
                                    { hotelData.description }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default SinglePoster;
