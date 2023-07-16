import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import {Button} from '@mui/material';
import GoogleLocationFilter from "../components/GoogleLocationFilter";


const Input = styled(MuiInput)`
  width: 42px;
`;

const DEFAULT_TEMPERATURE = 25;
const marks = [
    {
        value: 5,
        label: 'Very cold',
        range: { min: 5, max: 10 }
    },
    {
        value: 10,
        label: 'Cold',
        range: { min: 10, max: 15 }
    },
    {
        value: 25,
        label: 'Hot',
        range: { min: 15, max: 30 }
    },
    {
        value: 35,
        label: 'Very hot',
        range: { min: 30, max: 45 }
    },
];

function SearchBarSection({ handleSubmit }) {


    const [,setCity] = useState('');

    const [data, setData] = useState({city: null, minTemp: null, maxTemp: null, period: null})
    const [period, setPeriod] = useState(0);
    const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);

    const handleCityChange = (value) => {
        setCity(value);
        setData({...data, city: value });
    };

    const handlePeriod = (event) => {
        setPeriod(event.target.value);
        setData({...data, period: parseInt(event.target.value) });
    };

    const handleTemperature = (value) => {
        setTemperature(value);
        const mark = marks.find((mark) => mark.value === value);
        setData({...data, minTemp: mark.range.min, maxTemp: mark.range.max });
    };

    function valueLabelFormat(value) {
        const range = marks.find((mark) => mark.value === value).range;
        return `${range.min}°C - ${range.max}°C`
    }


    return (
        <>
            <Grid  container sx={{px: 2, py: 3}}
                   justifyContent="center"
                   alignItems="center">
                <Grid item xs={4}>
                    <GoogleLocationFilter handleCityChange={handleCityChange}></GoogleLocationFilter>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{width: '100%'}}>
                        <Typography id="track-inverted-range-slider" gutterBottom>
                            Inverted track range
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
                        />
                    </Box>
                </Grid>
                <Grid item justifyContent="center" xs={2}>
                    <Box>
                        <Grid>
                            <Typography id="input-slider" gutterBottom>
                                Period
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Input
                                value={period}
                                size="small"
                                onChange={handlePeriod}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 50,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={() => handleSubmit(data)}>Search</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default SearchBarSection;