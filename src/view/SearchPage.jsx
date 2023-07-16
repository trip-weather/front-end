import SuggestHotelsSection from "../layouts/SuggestHotelsSection";
import SearchBarSection from "../layouts/SearchBarSection";
import {Grid, Pagination} from "@mui/material";
import SuggestTownsSection from "../layouts/SuggestTownsSection";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import HotelCard from "../layouts/HotelCard";
import {useState} from "react";


function SearchPage() {

    const [foundHotels, setFoundHotels] = useState([]);

    function handleSubmit(data) {
        console.log(data);

        if (data.city == null && data.minTemp == null && data.maxTemp == null && data.period == null) {
            axios.get('http://localhost:8080/api/suggested-hotels')
                .then((response) => {
                    console.log(response);
                    setFoundHotels(response.data);
                    // console.log(foundHotels);
                })
                .catch(error => console.error(error));
        } else {
            axios.get('http://localhost:8080/api/search', {params: data})
                .then((response) => {
                    setFoundHotels(response.data[0].results);
                })
                .catch(error => console.error(error));
        }


    }

    return (<>
        <SearchBarSection handleSubmit={handleSubmit}/>
        <Box sx={{backgroundColor: '#f5f5f5', padding: '40px 0'}}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Result of search
                </Typography>
                <Grid container spacing={5} sx={{paddingLeft: 20, paddingRight: 20}}>
                    {/* 12 / 5 */}
                    {foundHotels.map((hotel) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={hotel.id}>
                            <HotelCard key={hotel.id} hotel={hotel} sx={{maxWidth: 345}}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>

        <SuggestTownsSection/>
        <SuggestHotelsSection/>

    </>)
}

export default SearchPage;