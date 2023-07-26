import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {CircularProgress, Grid, Pagination} from "@mui/material";
import HotelCard from "./HotelCard";
import Box from "@mui/material/Box";

import '../css/found-hotels-section.css'

function FoundHotelsSection({hotels}) {

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(6);
    const [displayHotels, setDisplayHotels] = useState([]);

    useEffect(() => {
        const part = hotels.slice(count * offset, (count * offset) + count);
        setDisplayHotels(part);

    }, [offset, count, hotels]);

    return (
        <>
            {/*{isLoading &&*/}
            {/*    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>*/}
            {/*        <CircularProgress/>*/}
            {/*    </div>*/}
            {/*}*/}
            {/*{*/}
            {/*    !isLoading &&*/}
                <Box sx={{backgroundColor: '#fff', padding: '40px 0'}}>
                    <Container>
                        <Typography variant="h4" component="h2" align="center" gutterBottom>
                            Result of search
                        </Typography>
                        <Grid>
                            <div className={'found-hotels-container'}>
                                {displayHotels.map((hotel) => (
                                    <HotelCard key={hotel.id} hotel={hotel} sx={{maxWidth: 345}}/>
                                ))}
                            </div>
                        </Grid>

                        <Grid container
                              sx={{mt: 4}}
                              justifyContent="center"
                              alignItems="center" style={{width: '100%'}}>
                            <Grid item>
                                <Pagination count={Math.ceil(hotels.length / count)}
                                            onChange={(event, page) => setOffset(page - 1)}
                                            variant="outlined" color="secondary"/>
                            </Grid>
                        </Grid>

                    </Container>
                </Box>
            }
        </>
    );
}

export default FoundHotelsSection;