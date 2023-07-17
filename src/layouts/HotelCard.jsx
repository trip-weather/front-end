import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';


export default function HotelCard({ hotel }) {
  const { name, wishlistName, checkinDate, checkoutDate, photoMainUrl, priceBreakdown, propertyClass, reviewScoreWord } = hotel;
  const price = priceBreakdown.grossPrice.value.toFixed(2);
  const currency = priceBreakdown.grossPrice.currency;

  // console.log(hotel);
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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <FavoriteIcon style={{ color: '#FFC0CB' }} />
          </IconButton>
        }
        title={name}
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
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{reviewScoreWord}</Box>
      </Box>

      <CardMedia
        component="img"
        height="194"
        image={photoMainUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        <LocationOnRoundedIcon sx={{ color: red[500] }}/>
        {wishlistName}
        </Typography>
        <Typography variant='body4' color="text.secondary"><b> Крайна цена : </b>{price} {currency}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" href="#contained-buttons">
          Резервирай
        </Button>
        <Button variant="outlined" size="small" href="#contained-buttons">
          Виж детайли
        </Button>
      </CardActions>
    </Card>
  );
}
