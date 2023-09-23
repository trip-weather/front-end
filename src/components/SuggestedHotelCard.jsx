import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import {likeHotel, unlikeHotel} from "../services/UserService";
import {Link} from "react-router-dom";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Typography} from "@material-ui/core";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import {Button} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {red} from "@mui/material/colors";


export default function SuggestedHotelCard({hotel}) {
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
    } = hotel;


    const [isLiked, setIsLiked] = useState(false);
    const price = priceBreakdown.grossPrice.value.toFixed(2);
    const currency = priceBreakdown.grossPrice.currency;

    const toggleLikedHotel = (event) => {
        event.stopPropagation();

        if (!isLiked) {
            likeHotel(id)
                .then(() => {
                    setIsLiked((oldValue) => !oldValue);
                    console.log("hotel is liked")
                }).catch(error => {
                console.log(error);
            })

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


    return (
        <Card sx={{
            maxWidth: 345,
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f5f5f5',
            transition: 'box-shadow 0.3s',
            '&:hover': {
                boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.2)',
            },
        }}>
            <CardHeader style={{height: '100px', width: '100%'}}
                // avatar={
                //     <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                        action={
                            <IconButton onClick={toggleLikedHotel} className='pop-up-animation'>
                                {isLiked ? <FavoriteIcon style={{color: '#B1001CFF'}}/> :
                                    <FavoriteBorderIcon style={{color: '#B1001CFF'}}/>}
                            </IconButton>
                        }
                        title={
                            <Typography
                                sx={{
                                    maxWidth: '150px',
                                }}
                            >
                                {name}
                            </Typography>
                        }
                        subheader={`${checkinDate} - ${checkoutDate}`}
            />

            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="text-feedback"
                    value={propertyClass}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                />
                <Box sx={{ml: 2}}>{reviewScoreWord}</Box>
            </Box>

            <CardMedia style={{maxWidth: '100%'}}
                       component="img"
                       height="194"
                       image={photoMainUrl}
                       alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <LocationOnRoundedIcon sx={{color: red[500]}}/>
                    {wishlistName}
                </Typography>
                <Typography variant='body4' color="text.secondary"><b> Total Price : </b>{price} {currency}
                </Typography>
            </CardContent>
            <CardActions>
                <Link
                    to={`/hotel/${hotel.id}?checkIn=${checkinDate}&checkOut=${checkoutDate}&nearby=`}>
                    <Button variant="outlined" size="small">
                        See Details
                    </Button>
                </Link>
                {/*<div>*/}
                {/*    <ul style={{marginLeft: '2rem'}}>*/}
                {/*        {Object.keys((nearbyFilters ?? {})).map((key) => (*/}
                {/*            <li key={key}>*/}
                {/*                <Typography>*/}
                {/*                    {key}: {nearbyFilters[key]}*/}
                {/*                </Typography>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </CardActions>
        </Card>
    )

}