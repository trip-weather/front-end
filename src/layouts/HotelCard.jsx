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


export default function HotelCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        title="Shrimp and Chorizo Paella"
        subheader="10/10/2023 - 12/10/2023"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://media.istockphoto.com/id/1182393363/photo/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-in-hdr.jpg?s=612x612&w=0&k=20&c=pxdKXGCg5wnU1cpK-0em0FAISx0aV5o18l2FaU5u94M="
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
        <Typography variant='body4' color="text.secondary"><b> Крайна цена : </b> 1000 BGN</Typography>
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
