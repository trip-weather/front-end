import React, {useContext, useState} from 'react';
import {Box, Button, Grid, Typography} from '@mui/material';
import Container from "@mui/material/Container";
import SearchContext from "../contexts/search.context";
import CloseIcon from "@mui/icons-material/Close";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {API_URL_FULL} from "../shared/constants";

const useStyles = makeStyles((theme) => ({
    button: {
        borderRadius: 20,
        border: 'none',
        fontWeight: 'bold',
        minWidth: 100,
        minHeight: 50,
        padding: '10px 20px',
        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
        position: 'relative', // Added to create a pseudo-element for the border
        zIndex: 0,
        overflow: 'hidden',
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(45deg, #D0B8A8, #85586F, #F8EDE3)',
            opacity: 0.8,
            transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover:before': {
            opacity: 1, // Show the gradient border on hover
        },
        '&:hover': {
            backgroundColor: '#f44336',
            color: '#FFFFFF',
            border: 'none'
        },
    },
    selectedButton: {
        borderRadius: 20,
        border: 'none',
        fontWeight: 'bold',
        minWidth: 100,
        minHeight: 50,
        padding: '10px 20px',
        position: 'relative',
        overflow: 'hidden',
        background: 'red',
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: 'linear-gradient(45deg, #D0B8A8, #85586F, #F8EDE3)',
            opacity: 0.8,
            transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover:before': {
            opacity: 1,
        },
        color: '#FFFFFF',
    },
}));

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

export default function SuggestTownsSection({handleSubmit}) {
    const classes = useStyles();

    const [seasonFilters, setSeasonFilters] = useState({
        ['summer']: {selected: false},
        ['winter']: {selected: false}
    });
    const [selectedTown, setSelectedTown] = useState('');
    const [towns, setTowns] = useState(DEFAULT_TOWNS);
    const {data, setData} = useContext(SearchContext);


    const handleTownClick = (town) => {
        setSelectedTown(town);

        const modified = {...data, city: town + ''};
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
        }
        else {
            setTowns(DEFAULT_TOWNS);
        }

        setSeasonFilters(previous => ({...previous, [value]: {selected: selected}}));
    }


    return (
        <Box sx={{backgroundColor: '#f5f5f5', padding: '40px 0'}}>
            <Container maxWidth="lg">
                <Typography variant="h5" component="h2" align="center" gutterBottom>
                    You can filter towns by season
                    <Button className={seasonFilters['winter'].selected ? classes.selectedButton : classes.button}
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
                            border: `4px solid ${seasonFilters['summer'].selected ? '#f44336' : '#85586F'}`,
                            borderRadius: 20,
                            fontWeight: 'bold',
                        }}
                        variant={seasonFilters['summer'].selected ? 'contained' : 'outlined'}
                        color={seasonFilters['summer'].selected ? 'error' : 'primary'}
                        startIcon={seasonFilters['summer'].selected ? <CloseIcon/> :
                            <span role="img" aria-label="smiling face">🏖️</span>}
                        onClick={() => toggleFilterSelection('summer')}
                    >
                        Summer
                    </Button>
                </Typography>
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
                                    sx={{borderRadius: '5px', width: '100%', marginBottom: '10px'}}
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