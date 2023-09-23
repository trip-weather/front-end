import {Typography} from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {makeStyles} from "@material-ui/core/styles";
import {Button, CardActionArea} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, {useState} from "react";
import {likeHotel, unlikeHotel} from "../services/UserService";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        // marginBottom: theme.spacing(2),
        borderRadius: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    media: {
        width: '100%',
        height: 200,
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden',
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: theme.spacing(2),
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    likeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: '#85586F',
        outline: 'none',
        border: 'none',
        borderTopRightRadius: '10px',
    },
    hotelName: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    city: {
        fontSize: '0.9rem',
    },
}));


const FavoriteHotelCard = ({id, hotelName, city, imageUrl}) => {
    const classes = useStyles();
    const [isLiked, setIsLiked] = useState(true);
    const navigate = useNavigate();

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
        <Card onClick={() => navigate(`/hotel/${id}?&nearby=`)}
              className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={imageUrl} title={hotelName}/>
                <Button className={classes.likeButton} variant="outlined" style={{
                    // backgroundColor: '#DFD3C3',
                    color: '#85586F',
                    outline: 'none',
                    border: 'none'
                }} onClick={(event) => toggleLikedHotel(event)}
                        endIcon={isLiked ? <FavoriteIcon style={{color: '#85586F'}}/> :
                            <FavoriteBorderIcon/>}>
                </Button>
                <CardContent className={classes.content}>
                    <Typography variant="h6" className={classes.hotelName}>
                        {hotelName}
                    </Typography>
                    <Typography variant="body2" className={classes.city}>
                        {city}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default FavoriteHotelCard;