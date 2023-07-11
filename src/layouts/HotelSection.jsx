import HotelCard from "./HotelCard";
import { Grid } from "@mui/material";



export default function HotelSection() {
    return (
        <>
            <Grid container spacing={5} sx={{paddingLeft: 20, paddingRight: 20 }}>
                {/* 12 / 5 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <HotelCard sx={{ maxWidth: 345 }} />
                </Grid>
            </Grid>
        </>

    )
}