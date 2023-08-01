import React, {useContext, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import Container from "@mui/material/Container";
import SearchContext from "../contexts/search.context";

export default function SuggestTownsSection({ handleSubmit }) {


    const [selectedTown, setSelectedTown] = useState('');
    const { data, setData } = useContext(SearchContext);

    const handleTownClick = (town) => {
        setSelectedTown(town);

        const modified = { ...data, city: town + '' };
        setData(modified);
        handleSubmit();
    };

    const towns = [
        { name: 'Los Angeles', x: 50, y: 50 },
        { name: 'Florence', x: 150, y: 50 },
        { name: 'Nice', x: 250, y: 50 },
        { name: 'Sydney', x: 350, y: 50 },
        { name: 'Tel Aviv', x: 350, y: 50 },
        { name: 'San Diego', x: 350, y: 50 },
        { name: 'Tamarindo', x: 350, y: 50 },
        { name: 'Hong Kong', x: 350, y: 50 },
        { name: 'Lisbon', x: 350, y: 50 },
        { name: 'Barcelona', x: 350, y: 50 },
        { name: 'Palermo', x: 350, y: 50 },
        { name: 'Marseille', x: 350, y: 50 },
    ];

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
            <Container maxWidth="lg">
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    Most popular cities for tourism
                </Typography>
                <Grid container spacing={2}>
                    {towns.map((town, index) => (
                        <Grid item xs={6} sm={4} lg={2
                        } key={index}>
                            <Button style={{
                                borderColor: selectedTown === town.name ? '#85586F' : 'black',
                                color: selectedTown === town.name ? 'white' : '#85586F',
                                backgroundColor: selectedTown === town.name ? '#85586F' : 'white'
                            }}
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
    );
}