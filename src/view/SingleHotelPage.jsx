import React, {useContext, useEffect, useState} from 'react';
import {Button, CircularProgress, Divider, Modal, Typography} from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {getReservedHotelByExternalId, getSingleHotel, makeReservation} from "../services/HotelService";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import AuthContext from "../contexts/auth.context";
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {likeHotel, unlikeHotel} from "../services/UserService";
import '../css/single-hotel-page.css'
import {checkIsUserAuthenticated} from "../services/AuthServicce";
import NearbyCard from "../components/NearbyCard";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        flex: 1,
        height: 'max-content',
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    ratingIcon: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
    },
    reviewContainer: {
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    reviewText: {
        marginTop: theme.spacing(1),
    },
}));
const SingleHotelPage = ({}) => {
    const classes = useStyles();

    const {id} = useParams();
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const checkinDate = queryParams.get('checkIn');
    const checkoutDate = queryParams.get('checkOut');
    const nearby = queryParams.get('nearby') ?? null;

    const [isLoading, setIsLoading] = useState(true);
    const [isHotelReservedByUser, setIsHotelReservedByUser] = useState(false);
    const [isHotelReservedByUserInPeriod, setIsHotelReservedByUserInPeriod] = useState(false);
    const [hotelData, setHotelData] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


    const [isLiked, setIsLiked] = useState(false);

    const {userAuth} = useContext(AuthContext);

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        setIsHotelReservedByUser(userAuth.user.reserved.includes(Number.parseInt(id)));

        getSingleHotel(id, checkinDate, checkoutDate, nearby)
            .then(response => {
                console.log(nearby);
                setHotelData(response.data);
                console.log(response.data);
                console.log(response.data.nearby);

                setIsLoading(false);
                const liked = userAuth.isAuthenticated && userAuth.user.liked.includes(response.data.hotelId);
                setIsLiked(liked);

                if (userAuth.user.reserved.includes(Number.parseInt(id))) {
                    getReservedHotelByExternalId(id)
                        .then((res) => {
                            const checkInDate = res.data.checkInDate;
                            const checkOutDate = res.data.checkOutDate;

                            setIsHotelReservedByUserInPeriod(response.data.arrivalDate === checkInDate
                                && response.data.departureDate === checkOutDate);
                        })
                        .catch()
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });

    }, []);

    const toggleLikedHotel = () => {
        if (!isLiked) {
            likeHotel(id)
                .then(() => {
                    setIsLiked((oldValue) => !oldValue);
                    console.log("hotel is liked")
                }).catch(error => {
                console.log(error);
            })
            console.log(hotelData);
        } else {
            unlikeHotel(id)
                .then(() => {
                    setIsLiked((oldValue) => !oldValue);
                    console.log("hotel is unliked")
                }).catch(error => {
                console.log(error);
            })
        }
    }

    function handleMakeReservation() {
        if (!checkIsUserAuthenticated()) {
            navigate('/sign-in');
        }
        makeReservation(id, hotelData.totalPrice, checkinDate, checkoutDate)
            .then(response => {
                const sessionUrl = response.data;
                console.log('Payment Session URL:', sessionUrl);
                window.location.href = sessionUrl;
            }).catch(error => {
            console.log('Error creating payment session:', error.response.data)
        })
    }

    return (
        <>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            }
            {!isLoading &&
                <div className='single-hotel-view-content-wrapper'>
                    <div className="single-hotel-view-content-container">
                        <div className='single-hotel-view-header'>
                            <div>
                                <h2 className='hotel-view-name'> {hotelData.name} </h2>
                                <Typography className='single-hotel-view-period'>
                                    <PlaceIcon/>
                                    {`${hotelData.city},  ${hotelData.country}`}
                                </Typography>
                            </div>

                            {
                                userAuth.isAuthenticated &&
                                <Button variant="outlined" style={{
                                    backgroundColor: '#DFD3C3',
                                    color: '#85586F',
                                    outline: 'none',
                                    border: 'none'
                                }} onClick={toggleLikedHotel}
                                        endIcon={isLiked ? <FavoriteIcon style={{color: '#85586F'}}/> :
                                            <FavoriteBorderIcon/>}>
                                    <span> {isLiked ? 'Added to favourite' : 'Add to favourite'} </span>
                                </Button>
                            }

                        </div>
                        <div className='single-hotel-view-content'>
                            <div className="single-hotel-pictures-container">
                                <div className='single-hotel-left-container'>
                                    <div className="single-hotel-main-picture-swiper">
                                        <Swiper
                                            modules={[Autoplay, Pagination]}
                                            style={{height: '100%'}}
                                            effect="cards"
                                            speed={2500}
                                            pagination={true}
                                            loop={true}
                                            autoplay={{delay: 1000, disableOnInteraction: true}}
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
                                                <SwiperSlide style={{height: '100%'}} id={index}
                                                             onClick={() => handlePhotoClick(photo)}>
                                                    <img src={photo.urlMax}
                                                         style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Modal
                                            open={isModalOpen}
                                            onClose={handleCloseModal}
                                            aria-labelledby="photo-modal-title"
                                            aria-describedby="photo-modal-description"
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                width: '1000px',
                                            }}>
                                                {selectedPhoto && (
                                                    <img
                                                        src={selectedPhoto.urlMax}
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            maxHeight: '80vh'
                                                        }}
                                                        alt={`Hotel Photo ${selectedPhoto.index}`}
                                                    />
                                                )}
                                                <IconButton
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                    }}
                                                    onClick={handleCloseModal}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="single-hotel-secondary-pictures-container">
                                        {
                                            hotelData.photos.filter((_, index) => (index >= 1 && index < 5))
                                                .map((photo, index) => (
                                                    <div className="single-hotel-secondary-picture">
                                                        <img key={index}
                                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                             src={photo.urlMax}/>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                <div className='single-hotel-right-container'>
                                    {!isHotelReservedByUserInPeriod &&
                                        <Box className={classes.container}>
                                            <Typography variant="h6">Reservation Dates</Typography>
                                            <Typography>
                                                {`${hotelData.arrivalDate} - ${hotelData.departureDate}`}
                                            </Typography>
                                            <Divider/>
                                            {/*<div className={classes.ratingContainer}>*/}
                                            {/*    <StarIcon className={classes.ratingIcon}/>*/}
                                            {/*    <Typography variant="body2">Rating:</Typography>*/}
                                            {/*    <Rating value={hotelData.rating} precision={0.5} readOnly/>*/}
                                            {/*</div>*/}
                                            <Divider/>
                                            <Typography variant="body1" className={classes.reviewText}>
                                                Price per night: {hotelData.pricePerDay}
                                            </Typography>
                                            <Divider/>
                                            <Typography variant="body1">Total Price
                                                for {hotelData.nights} days:</Typography>
                                            <Typography variant="h6" color="primary">
                                                ${hotelData.totalPrice.toFixed(2)}
                                            </Typography>
                                            <Button onClick={handleMakeReservation}
                                                    variant="contained" style={{backgroundColor: '#85586F'}}>Make a
                                                reservation
                                            </Button>
                                        </Box>
                                    }
                                    {
                                        isHotelReservedByUserInPeriod &&
                                        <div>
                                            <Typography variant='h6'>
                                                {`${hotelData.arrivalDate} - ${hotelData.departureDate}`}
                                            </Typography>
                                            <p className='already-booked-text'> You have already booked the hotel </p>
                                            <Button style={{
                                                backgroundColor: '#DFD3C3',
                                                color: '#85586F',
                                                fontWeight: 600,
                                                border: '1px solid #85586F'
                                            }} variant='outlined' href={'/profile'}> More info </Button>
                                        </div>
                                    }
                                    {
                                        (!isHotelReservedByUserInPeriod && isHotelReservedByUser) &&
                                        <div>
                                            <span className='already-booked-text'> You have reservation for this hotel in different period </span>
                                            <Button style={{
                                                backgroundColor: '#DFD3C3',
                                                color: '#85586F',
                                                fontWeight: 600,
                                                border: '1px solid #85586F'
                                            }} variant='outlined' href={'/profile'}> More info </Button>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="single-hotel-description-container">
                                <p className="single-hotel-description"
                                   dangerouslySetInnerHTML={{__html: hotelData.description}}>
                                </p>
                            </div>
                            <div className="property-list">
                                {hotelData.properties?.map((property, index) => (
                                    <React.Fragment key={index}>
                                        <div className="property">
                                            <span className="property-text">{property.name}</span>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className="property-list">
                                {Object.keys(hotelData.nearby).map((key, index) => {
                                    return <NearbyCard key={index} nearby={hotelData.nearby[key]}></NearbyCard>
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default SingleHotelPage;
