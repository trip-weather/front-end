import React, {useContext, useState} from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography, Grid, Select, MenuItem } from '@mui/material';
import Container from "@mui/material/Container";
import HotelCard from "./HotelCard";
import SearchContext from "../contexts/search.context";

export default function SuggestTownsSection({ handleSubmit }) {


    const [selectedTown, setSelectedTown] = useState('');
    const { data, setData } = useContext(SearchContext);

    const handleTownClick = (town) => {
        setSelectedTown(town);
        setData({ ...data, city: town + '' });
        handleSubmit(data);
        console.log(data);

        // Logic for handling the selected town
    };

    const towns = [
        { name: 'Sofia', x: 50, y: 50 },
        { name: 'Plovdiv', x: 150, y: 50 },
        { name: 'Varna', x: 250, y: 50 },
        { name: 'Burgas', x: 350, y: 50 }
        // Add more towns as needed
    ];

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
            <Container maxWidth="lg">
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Most popular cities around you for tourism
                </Typography>
                <Grid container spacing={2}>
                    {towns.map((town, index) => (
                        <Grid item xs={6} sm={4} lg={2
                        } key={index}>
                            <Button
                                onClick={() => handleTownClick(town.name)}
                                variant={data.city?.includes(town.name) ?? false ? 'contained' : 'outlined'}
                                sx={{ borderRadius: '5px', width: '100%', marginBottom: '10px' }}
                            >
                                {town.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>


        // <Box sx={{ m: 20, minWidth: 120, height: '150px', border: '1px solid', position: 'relative', overflow: 'hidden' }}>
        //     <Grid container spacing={2}>
        //         {towns.map((town, index) => (
        //             <Grid item xs={6} sm={4} lg={2
        //             } key={index}>
        //                 <Button
        //                     onClick={() => handleTownClick(town.name)}
        //                     variant={selectedTown === town.name ? 'contained' : 'outlined'}
        //                     sx={{ borderRadius: '5px', width: '100%', marginBottom: '10px' }}
        //                 >
        //                     {town.name}
        //                 </Button>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Box>
    );
}