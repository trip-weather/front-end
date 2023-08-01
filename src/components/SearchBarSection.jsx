import * as React from 'react';
import {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import {Button} from '@mui/material';
import GoogleLocationFilter from "./GoogleLocationFilter";
import SearchIcon from '@mui/icons-material/Search';
import '../css/search-bar-section.css'
import SearchContext from "../contexts/search.context";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MuseumIcon from '@mui/icons-material/Museum';
import ParkIcon from '@mui/icons-material/Park';
import CloseIcon from '@mui/icons-material/Close';




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

function SearchBarSection({handleSubmit}) {
    const {data, setData} = useContext(SearchContext);

    const [period, setPeriod] = useState(0);
    const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
    const [appliedFilters, setAppliedFilters] = useState({
        ['museum']: { selected: false },
        ['fitness']: { selected: false },
        ['park']: { selected: false },
    });

    const handlePeriod = (event) => {
        setPeriod(event.target.value);
        setData({...data, period: parseInt(event.target.value)});
    };

    const toggleFilterSelection = (value) => {
        setAppliedFilters(previous => ({ ...previous, [value]: { selected: !previous[value].selected } }));

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
                                endIcon={<SearchIcon/>} onClick={() => handleSubmit()}>Search</Button>
                    </div>
                </div>
                <div className={'down-filters-container'}>
                    <Button
                        variant={ appliedFilters['fitness'].selected ? 'contained' : 'outlined' }
                        color={ appliedFilters['fitness'].selected ? 'error' : 'primary' }
                        startIcon={ appliedFilters['fitness'].selected ? <CloseIcon/> : <FitnessCenterIcon />}
                        onClick={() => toggleFilterSelection('fitness') }
                    >
                        Fitness center
                    </Button>
                    <Button
                        variant={ appliedFilters['park'].selected ? 'contained' : 'outlined' }
                        color={ appliedFilters['park'].selected ? 'error' : 'primary' }
                        startIcon={ appliedFilters['park'].selected ? <CloseIcon/> : <ParkIcon />}
                        onClick={() => toggleFilterSelection('park') }
                    >
                        Park and gardens
                    </Button>
                    <Button
                        variant={ appliedFilters['museum'].selected ? 'contained' : 'outlined' }
                        color={ appliedFilters['museum'].selected ? 'error' : 'primary' }
                        startIcon={ appliedFilters['museum'].selected ? <CloseIcon/> : <MuseumIcon /> }
                        onClick={() => toggleFilterSelection('museum') }
                    >
                        Museum
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SearchBarSection;