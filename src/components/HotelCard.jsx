import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {useNavigate} from 'react-router-dom'
import {likeHotel, unlikeHotel} from "../services/UserService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import '../css/search-hotel-card.css'
import CheckIcon from '@mui/icons-material/Check';
import AuthContext from "../contexts/auth.context";

export default function HotelCard({hotel}) {
    const {
        id,
        name,
        wishlistName,
        checkinDate,
        checkoutDate,
        photoMainUrl,
        priceBreakdown,
        propertyClass,
        reviewScoreWord,
        nearbyFilters
    } = hotel;

    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const {userAuth, updateUserAuth} = useContext(AuthContext);

    const price = priceBreakdown.grossPrice.value.toFixed(2);
    const currency = priceBreakdown.grossPrice.currency;

    const nearbyKeys = nearbyFilters ? Object.keys(nearbyFilters) : [];
    const nearbyQueryParam = nearbyKeys.join(',');

    useEffect(() => {
        setIsLiked(userAuth.user.liked.includes(hotel.id));
    }, []);

    const toggleLikedHotel = (event) => {
        event.stopPropagation();

        if (!isLiked) {
            likeHotel(id)
                .then(() => {
                    setIsLiked((oldValue) => !oldValue);
                    updateUserAuth({ ...userAuth, user: { ...userAuth.user, liked: [ ...userAuth.user.liked, id ] }});
                }).catch(error => {
                console.log(error);
            })

        } else {
            unlikeHotel(id)
                .then(() => {
                    setIsLiked((oldValue) => !oldValue);
                    updateUserAuth({ ...userAuth, user: { ...userAuth.user, liked: userAuth.user.liked.filter(hotelId => hotelId !== id) }});
                }).catch(error => {
                console.log(error);
            })
        }
    }
    return (
        <Box
            onClick={() => navigate(`/hotel/${hotel.id}?checkIn=${checkinDate}&checkOut=${checkoutDate}&nearby=${nearbyQueryParam}`)}
            sx={{
                width: '24rem',
                height: '30rem',
                cursor: 'pointer'
            }}
        >
            <div className={'card-hotel-upper-container'}>
                <img
                    style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '.5rem'}}
                    height="194"
                    src={photoMainUrl}
                    alt="Hotel card cover picture"
                />
                <div className={'rating-container'}>
                    <Rating
                        sx={{padding: '.3rem .5rem', borderRadius: '.5rem', background: '#fff'}}
                        name="text-feedback"
                        value={propertyClass}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                    />

                </div>
                <div className={'like-btn-container'}>
                    <IconButton size='large' onClick={(event) => toggleLikedHotel(event)}
                                className='pop-up-animation like-btn'>
                        {isLiked ? <FavoriteIcon fontSize='medium' style={{color: '#B1001CFF'}}/> :
                            <FavoriteBorderIcon fontSize='medium' style={{color: '#B1001CFF'}}/>}
                    </IconButton>
                </div>

            </div>
            <div className={'card-hotel-down-container'}>
                <Typography className={'info-hotel-name'} variant='h5'> {name} </Typography>
                <Typography variant="body2" color="text.secondary">
                    <LocationOnRoundedIcon sx={{color: red[500]}}/>
                    {wishlistName}
                </Typography>
                <span className={'info-price'}> {price} {currency} </span>
                <span className={'info-dates'}>   {checkinDate} - {checkoutDate}  </span>
                <div className={'nearby-container'}>
                    {Object.keys((nearbyFilters ?? {})).map((key) => (
                        <span className={'nearby-place'} key={key}>
                           <CheckIcon/> {key}: {nearbyFilters[key]}
                        </span>
                    ))}
                </div>
            </div>
        </Box>

        // <Card sx={{
        //     maxWidth: 345,
        //     border: '1px solid #e0e0e0',
        //     borderRadius: '8px',
        //     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        //     backgroundColor: '#f5f5f5',
        //     transition: 'box-shadow 0.3s',
        //     '&:hover': {
        //         boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.2)',
        //     },
        // }}>
        //     <CardHeader style={{height: '100px', width: '100%'}}
        //                 // avatar={
        //                 //     <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
        //                 //         R
        //                 //     </Avatar>
        //                 // }
        //                 action={
        //                     <IconButton onClick={toggleLikedHotel} className='pop-up-animation'>
        //                         {isLiked ? <FavoriteIcon style={{color: '#B1001CFF'}}/> :
        //                             <FavoriteBorderIcon style={{color: '#B1001CFF'}}/>}
        //                     </IconButton>
        //                 }
        //                 title={
        //                     <Typography
        //                         sx={{
        //                             maxWidth: '150px',
        //                         }}
        //                     >
        //                         {name}
        //                     </Typography>
        //                 }
        //                 subheader={`${checkinDate} - ${checkoutDate}`}
        //     />
        //
        //     <Box
        //         sx={{
        //             width: 200,
        //             display: 'flex',
        //             alignItems: 'center',
        //         }}
        //     >
        //         <Rating
        //             name="text-feedback"
        //             value={propertyClass}
        //             readOnly
        //             precision={0.5}
        //             emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
        //         />
        //         <Box sx={{ml: 2}}>{reviewScoreWord}</Box>
        //     </Box>
        //
        //     <CardMedia style={{maxWidth: '100%'}}
        //                component="img"
        //                height="194"
        //                image={photoMainUrl}
        //                alt="Paella dish"
        //     />
        //     <CardContent>
        //         <Typography variant="body2" color="text.secondary">
        //             <LocationOnRoundedIcon sx={{color: red[500]}}/>
        //             {wishlistName}
        //         </Typography>
        //         <Typography variant='body4' color="text.secondary"><b> Total Price : </b>{price} {currency}
        //         </Typography>
        //     </CardContent>
        //     <CardActions>
        //         <Link
        //             to={`/hotel/${hotel.id}?checkIn=${checkinDate}&checkOut=${checkoutDate}&nearby=${nearbyQueryParam}`}>
        //             <Button variant="outlined" size="small">
        //                 See Details
        //             </Button>
        //         </Link>
        //         <div>
        //             <ul style={{marginLeft: '2rem'}}>
        //                 {Object.keys((nearbyFilters ?? {})).map((key) => (
        //                     <li key={key}>
        //                         <Typography>
        //                             {key}: {nearbyFilters[key]}
        //                         </Typography>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     </CardActions>
        // </Card>
    );
}
