import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import Container from "@mui/material/Container";
import SearchContext from "../contexts/search.context";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {API_URL_FULL} from "../shared/constants";
import '../css/suggested-towns.css'
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#85586F',
        },
        error: {
            main: '#D0B8A8',
            contrastText: '#fff'
        }
    },
});

const DEFAULT_TOWNS = [
    {name: 'Florence'},
    {name: 'Nice'},
    {name: 'Los Angeles'},
    {name: 'Sydney'},
    {name: 'Tel Aviv'},
    {name: 'San Diego'},
    {name: 'Tamarindo'},
    {name: 'Hong Kong'},
    {name: 'Lisbon'},
    {name: 'Barcelona'},
    {name: 'Palermo'},
    {name: 'Marseille'},
];

export default function SuggestTownsSection({handleSubmit, selected}) {

    const [seasonFilters, setSeasonFilters] = useState({
        ['summer']: {selected: false},
        ['winter']: {selected: false}
    });

    const [selectedTown, setSelectedTown] = useState('');
    const [towns, setTowns] = useState(DEFAULT_TOWNS);
    const {data, setData} = useContext(SearchContext);

    useEffect(() => {
        const foundTown = DEFAULT_TOWNS.find((town) => town.name === selected) ?? DEFAULT_TOWNS[0];
        setSelectedTown(foundTown.name);
        handleTownClick(foundTown.name);
    }, [selected]);


    const handleTownClick = (town) => {
        town = town !== selectedTown ? town : null;
        setSelectedTown(town);

        const modified = {...data, city: town };
        if(town === null) delete data.city;

        setData(modified);
        handleSubmit(modified);
    };

    const toggleFilterSelection = (value) => {

        const selected = !seasonFilters[value].selected;
        setSeasonFilters({
            ['summer']: {selected: false},
            ['winter']: {selected: false}
        });

        if (selected) {
            axios.get(`${API_URL_FULL}/cities?type=${value}`)
                .then(response => {
                    console.log(response.data)
                    setTowns(response.data.map(town => ({name: town})))
                })
                .catch()
        } else {
            setTowns(DEFAULT_TOWNS);
        }

        setSeasonFilters(previous => ({...previous, [value]: {selected: selected}}));
    }


    return (
        <Box sx={{backgroundColor: '#f5f5f5', padding: '40px 0'}}>
            <Container maxWidth="lg">
                <Box>
                    <Typography variant="h3" component="h2" align="center" gutterBottom>
                        Most popular cities for tourism
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', my: '1.5rem'}}>
                        <Typography sx={{mr: '.5rem'}} variant="h6" component="h2" align="center" gutterBottom>
                            Filter by season:
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <Button
                                style={{
                                    border: `1px solid ${seasonFilters['winter'].selected ? '#D0B8A8' : '#85586F'}`,
                                    borderRadius: 20,
                                    fontWeight: '500',
                                }}
                                variant={seasonFilters['winter'].selected ? 'contained' : 'outlined'}
                                color={seasonFilters['winter'].selected ? 'error' : 'primary'}
                                startIcon={seasonFilters['winter'].selected ? <CloseIcon/> :
                                    <span role="img" aria-label="smiling face">⛄️</span>}
                                onClick={() => toggleFilterSelection('winter')}
                                border={'none'}
                            >
                                Winter
                            </Button>
                            <Button
                                style={{
                                    border: `1px solid ${seasonFilters['summer'].selected ? '#D0B8A8' : '#85586F'}`,
                                    borderRadius: 20,
                                    fontWeight: '500',
                                    marginLeft: '.5rem',
                                }}
                                variant={seasonFilters['summer'].selected ? 'contained' : 'outlined'}
                                color={seasonFilters['summer'].selected ? 'error' : 'primary'}
                                startIcon={seasonFilters['summer'].selected ? <CloseIcon/> :
                                    <span role="img" aria-label="smiling face">🏖️</span>}
                                onClick={() => toggleFilterSelection('summer')}
                            >
                                Summer
                            </Button>
                        </ThemeProvider>
                    </Box>
                </Box>

                <Grid className='towns-container' container spacing={2}>
                    {/*<div className='towns-container'>*/}
                    {towns.map((town, index) => (
                        <Grid item xs={6} sm={4} lg={2} key={index} className='falling-animation'>
                            <Button className='town-button' style={{
                                borderColor: selectedTown === town.name ? '#85586F' : 'black',
                                color: selectedTown === town.name ? 'white' : '#85586F',
                                backgroundColor: selectedTown === town.name ? '#85586F' : 'white'
                            }}
                                    startIcon={selectedTown === town.name && <CloseIcon/>}
                                    onClick={() => handleTownClick(town.name)}
                                    variant={data.city?.includes(town.name) ?? false ? 'contained' : 'outlined'}
                                    sx={{borderRadius: '5px', width: '100%', marginBottom: '10px'}}
                            >
                                {town.name}
                            </Button>
                        </Grid>
                    ))}
                    {/*</div>*/}
                </Grid>
            </Container>
        </Box>
    );
}