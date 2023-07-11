import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { useState } from 'react';
import { Button } from '@mui/material';

const cities = ['Sofia', 'Plovdiv', 'Burgas', 'Varna'];
const Input = styled(MuiInput)`
  width: 42px;
`;


function SearchBarSection() {

    const [city, setCity] = useState('');

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const [minValue, setMinValue] = useState(25);
    const [maxValue, setMaxValue] = useState(30);
    const [period, setPeriod] = useState(1);

    const handleSliderChangeMin = (event, newValue) => {
        setMinValue(newValue);
    };
    const handleSliderChangeMax = (event, newValue) => {
        setMaxValue(newValue);
    };
    const handlePeriod = (event, newValue) => {
        setPeriod(newValue);
    };


    const handleInputChangeMin = (event) => {
        setMinValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleInputChangeMax = (event) => {
        setMaxValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlurMin = () => {
        if (minValue < 0) {
            setMinValue(0);
        } else if (minValue > 60) {
            setMinValue(60);
        }
    };
    const handleBlurMax = () => {
        if (maxValue < 0) {
            setMinValue(0);
        } else if (maxValue > 60) {
            setMinValue(60);
        }
    };

    return (
        <>
            <Grid container spacing={3} sx={{ paddingLeft: 20, m: 1, minWidth: 120 }}>
                <Grid sx={{ m: 3, width: 150 }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">City</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={city}
                            label="City"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {cities.map((option) => (
                                <MenuItem value={option}>{option}</MenuItem>
                            )
                            )}
                        </Select>
                        <FormHelperText>You can choose city</FormHelperText>
                    </FormControl>
                </Grid>

                <Box sx={{ m: 3, width: 250 }}>
                    <Typography id="input-slider" gutterBottom>
                        Minimum temperature
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <DeviceThermostatIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={typeof minValue === 'number' ? minValue : 0}
                                onChange={handleSliderChangeMin}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={minValue}
                                size="small"
                                onChange={handleInputChangeMin}
                                onBlur={handleBlurMin}
                                inputProps={{
                                    step: 1,
                                    min: -10,
                                    max: 50,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>

                    </Grid>
                </Box>

                <Box sx={{ m: 3, width: 250 }}>
                    <Typography id="input-slider" gutterBottom>
                        Maximum temperature
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <DeviceThermostatIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={typeof maxValue === 'number' ? maxValue : 0}
                                onChange={handleSliderChangeMax}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={maxValue}
                                size="small"
                                onChange={handleInputChangeMax}
                                onBlur={handleBlurMax}
                                inputProps={{
                                    step: 1,
                                    min: -10,
                                    max: 50,
                                    type: 'number',
                                    'aria-labelledby': 'input-slider',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ m: 3, width: 250 }}>
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
                            // onBlur={handlePeriod}
                            inputProps={{
                                step: 1,
                                min: 1,
                                max: 50,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Box>
                <Grid sx={{ m: 3 }}>
                    <Button variant="contained">Search</Button>
                </Grid>

            </Grid>

        </>
    )
}

export default SearchBarSection;