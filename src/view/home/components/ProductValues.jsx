import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {Typography} from "@material-ui/core";
// import productValues1 from '../resources/productValues1.svg'

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function ProductValues() {
    return (
        <Box
            component="section"
            sx={{display: 'flex', overflow: 'hidden', bgcolor: '#DFD3C3', height: '500px', maxHeight: '700px'}}
        >
            <Container sx={{mt: 15, mb: 30, display: 'flex', position: 'relative'}}>
                {/*<Box*/}
                {/*    component="img"*/}
                {/*    src="/static/themes/onepirate/productCurvyLines.png"*/}
                {/*    alt="curvy lines"*/}
                {/*    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}*/}
                {/*/>*/}
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            {/*<Box*/}
                            {/*    component="img"*/}
                            {/*    src="src/resources/productValues1.svg"*/}
                            {/*    alt="suitcase"*/}
                            {/*    sx={{ height: 55 }}*/}
                            {/*/>*/}
                            {/*<img src={productValues1}/>*/}
                            {/*<Typography variant="h6" sx={{my: 5}}>*/}
                            {/*    The best luxury hotels*/}
                            {/*</Typography>*/}
                            <Typography variant="h5">
                                We believe that planning the perfect vacation should be an exciting and stress-free
                                experience. That's why we've created a convenient solution to help you find your ideal
                                getaway effortlessly.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Typography variant="h5">
                                With our integrated platform, you can explore a world of possibilities, combining vital
                                information about temperature, hotels, and flight tickets all in one place.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Typography variant="h5">
                                Say goodbye to endless tabs and overwhelming search results.
                                Our mission is to simplify the travel planning process and offer you a seamless journey
                                towards your dream vacation.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductValues;