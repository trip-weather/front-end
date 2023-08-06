import * as React from 'react';
import {useContext, useState} from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import {Button, Collapse} from '@mui/material';
import GoogleLocationFilter from "./GoogleLocationFilter";
import SearchIcon from '@mui/icons-material/Search';
import SearchContext from "../contexts/search.context";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MuseumIcon from '@mui/icons-material/Museum';
import ParkIcon from '@mui/icons-material/Park';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import '../css/search-bar-section.css'

const Input = styled(MuiInput)`
  width: 42px;
`;

const DEFAULT_TEMPERATURE = 25;
const marks = [
    {
        value: 5,
        label: 'Very cold',
        range: {min: 5, max: 10}
    },
    {
        value: 10,
        label: 'Cold',
        range: {min: 10, max: 15}
    },
    {
        value: 25,
        label: 'Hot',
        range: {min: 15, max: 30}
    },
    {
        value: 35,
        label: 'Very hot',
        range: {min: 30, max: 45}
    },
];

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

function SearchBarSection({handleSubmit}) {

    const {data, setData} = useContext(SearchContext);

    const [period, setPeriod] = useState(0);
    const [isFilterSectionExtended, setIsFilterSectionExtended] = useState(false);
    const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
    const [appliedFilters, setAppliedFilters] = useState({
        ['museum']: {selected: false},
        ['fitness']: {selected: false},
        ['park']: {selected: false},
        ['nightlife']: {selected: false},
        ['shopping mall']: {selected: false},
    });

    const handlePeriod = (event) => {
        setPeriod(event.target.value);
        setData({...data, period: parseInt(event.target.value)});
    };

    const toggleFilterSelection = (value) => {
        setAppliedFilters(previous => ({...previous, [value]: {selected: !previous[value].selected}}));

        setData((previous) => ({
            ...previous,
            filters: previous.filters.includes(value) ? previous.filters.filter(filter => filter !== value) : [...previous.filters, value],
        }));
    }

    const handleTemperature = (value) => {
        setTemperature(value);
        const mark = marks.find((mark) => mark.value === value);
        setData({...data, minTemp: mark.range.min, maxTemp: mark.range.max});
    };

    function valueLabelFormat(value) {
        const range = marks.find((mark) => mark.value === value).range;
        return `${range.min}°C - ${range.max}°C`
    }


    return (
        <>
            <div className={'filters-wrapper'}>
                <div className={'filters-container'}>
                    <div className={'upper-filters-container'}>
                        <div className={'filter filter-location'}>
                            <GoogleLocationFilter></GoogleLocationFilter>
                        </div>
                        <div className={'filter'}>
                            <Box sx={{flexDirection: 'column'}}>
                                <Typography id="track-inverted-range-slider" gutterBottom>
                                    Temperature
                                </Typography>
                                <Slider
                                    aria-label="Restricted values"
                                    defaultValue={25}
                                    valueLabelFormat={valueLabelFormat}
                                    value={temperature}
                                    onChange={(event, value) => handleTemperature(value)}
                                    step={null}
                                    valueLabelDisplay="on"
                                    marks={marks}
                                    min={5}
                                    max={35}
                                    sx={{color: '#85586F'}}
                                />
                            </Box>
                        </div>
                        <div className={'filter filter-period'}>
                            <Typography id="input-slider" gutterBottom>
                                Days
                            </Typography>
                            <Input
                                value={period}
                                size="small"
                                type={'number'}
                                onChange={handlePeriod}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 50,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </div>
                        <div className={'filter'}>
                            <Button style={{backgroundColor: '#85586F'}}
                                    fullWidth
                                    variant="contained" sx={{px: '40px'}}
                                    endIcon={<SearchIcon/>} onClick={() => handleSubmit(data)}>Search</Button>
                        </div>
                    </div>
                    <Button className={'filter-extend-btn'}
                            variant="contained"
                            startIcon={isFilterSectionExtended ? <CloseIcon/> : <FilterAltIcon/>}
                            onClick={() => setIsFilterSectionExtended(previous => !previous)}> {isFilterSectionExtended ? 'Close filter' : 'More filter'}
                    </Button>
                    <Collapse in={isFilterSectionExtended} timeout="auto" unmountOnExit>
                        <div className={'down-filters-container'}>
                            <ThemeProvider theme={theme}>
                                <Button style={{
                                    border: `1px solid ${appliedFilters['fitness'].selected ? '#D0B8A8' : '#85586F'}`,
                                    borderRadius: 20,
                                    fontWeight: '600',
                                }}
                                        variant={appliedFilters['fitness'].selected ? 'contained' : 'outlined'}
                                        color={appliedFilters['fitness'].selected ? 'error' : 'primary'}
                                        startIcon={appliedFilters['fitness'].selected ? <CloseIcon/> :
                                            <FitnessCenterIcon/>}
                                        onClick={() => toggleFilterSelection('fitness')}
                                >
                                    Fitness center
                                </Button>
                                <Button style={{
                                    border: `1px solid ${appliedFilters['park'].selected ? '#D0B8A8' : '#85586F'}`,
                                    borderRadius: 20,
                                    fontWeight: '600',
                                }}
                                        variant={appliedFilters['park'].selected ? 'contained' : 'outlined'}
                                        color={appliedFilters['park'].selected ? 'error' : 'primary'}
                                        startIcon={appliedFilters['park'].selected ? <CloseIcon/> : <ParkIcon/>}
                                        onClick={() => toggleFilterSelection('park')}
                                >
                                    Park and gardens
                                </Button>

                                <Button
                                    style={{
                                        border: `1px solid ${appliedFilters['museum'].selected ? '#D0B8A8' : '#85586F'}`,
                                        borderRadius: 20,
                                        fontWeight: '600',
                                    }}
                                    variant={appliedFilters['museum'].selected ? 'contained' : 'outlined'}
                                    color={appliedFilters['museum'].selected ? 'error' : 'primary'}
                                    startIcon={appliedFilters['museum'].selected ? <CloseIcon/> : <MuseumIcon/>}
                                    onClick={() => toggleFilterSelection('museum')}
                                >
                                    Museum
                                </Button>

                                <Button
                                    style={{
                                        border: `1px solid ${appliedFilters['nightlife'].selected ? '#D0B8A8' : '#85586F'}`,
                                        borderRadius: 20,
                                        fontWeight: '600',
                                    }}
                                    variant={appliedFilters['nightlife'].selected ? 'contained' : 'outlined'}
                                    color={appliedFilters['nightlife'].selected ? 'error' : 'primary'}
                                    startIcon={appliedFilters['nightlife'].selected ? <CloseIcon/> : <MuseumIcon/>}
                                    onClick={() => toggleFilterSelection('nightlife')}
                                >
                                    Nightlife
                                </Button>

                                <Button
                                    style={{
                                        border: `1px solid ${appliedFilters['shopping mall'].selected ? '#D0B8A8' : '#85586F'}`,
                                        borderRadius: 20,
                                        fontWeight: '600',
                                    }}
                                    variant={appliedFilters['shopping mall'].selected ? 'contained' : 'outlined'}
                                    color={appliedFilters['shopping mall'].selected ? 'error' : 'primary'}
                                    startIcon={appliedFilters['shopping mall'].selected ? <CloseIcon/> : <MuseumIcon/>}
                                    onClick={() => toggleFilterSelection('shopping mall')}
                                >
                                    Shopping Districts
                                </Button>
                            </ThemeProvider>
                        </div>
                    </Collapse>
                </div>
            </div>
        </>
    )
}

export default SearchBarSection;