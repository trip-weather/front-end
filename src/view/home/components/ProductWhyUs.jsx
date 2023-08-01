import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@material-ui/core";
import {Button} from "@mui/material";

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: '#85586F',
    fontWeight: 'bold',
    marginBottom: '2rem'
    // width: '700px'
};

const image = {
    height: 55,
    my: 4,
};

function ProductWhyUs() {
    return (
        <Box
            component="section"
            sx={{display: 'flex', backgroundColor: '#F8EDE3', overflow: 'hidden', height: '600px'}}
        >
            <Container
                sx={{
                    mt: 10,
                    mb: 15,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/*<Box*/}
                {/*    component="img"*/}
                {/*    src="/static/themes/onepirate/productCurvyLines.png"*/}
                {/*    alt="curvy lines"*/}
                {/*    sx={{*/}
                {/*        pointerEvents: 'none',*/}
                {/*        position: 'absolute',*/}
                {/*        top: -180,*/}
                {/*        opacity: 0.7,*/}
                {/*    }}*/}
                {/*/>*/}
                <Typography variant="h4" style={{ backgroundColor: '#D0B8A8', color:'white', width: '100%', marginBottom: '4rem', textAlign: 'center'}}>
                    Why us ?
                </Typography>
                <div>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>1.Vast Selection of Hotels:</Box>
                                <Typography variant="h5">
                                    We offer an extensive catalog of hotels in various cities.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>2. Weather-Integrated Hotel Search</Box>
                                <Typography variant="h5">
                                    Filter your search based on the local weather forecast, ensuring your stay is as
                                    pleasant as can be.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box sx={number}>3. Effortless Flight Booking: </Box>
                                <Typography variant="h5">
                                    Forget the stress of searching for flights separately.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                <Button style={{backgroundColor: '#85586F'}}
                    size="large"
                    variant="contained"
                    component="a"
                    href="/search"
                    sx={{mt: 8}}
                >
                    Search
                </Button>
            </Container>
        </Box>
    );
}

export default ProductWhyUs;