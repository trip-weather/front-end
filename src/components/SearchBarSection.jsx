import * as React from 'react';
import {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import GoogleLocationFilter from "./GoogleLocationFilter";
import SearchIcon from '@mui/icons-material/Search';
import '../css/search-bar-section.css'
import SearchContext from "../contexts/search.context";


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
    const { data, setData } = useContext(SearchContext);

    // const [data, setData] = useState({ city: null, minTemp: null, maxTemp: null, period: null })
    const [period, setPeriod] = useState(0);
    const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

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
            <div className={'filters-container'}>
                <div className={'filter filter-location'}>
                    <GoogleLocationFilter></GoogleLocationFilter>
                </div>
                <div className={'filter'}>
                    <Box sx={{ flexDirection: 'column' }}>
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
                    <Button style={{borderColor: '#85586F', color: '#85586F'}}
                            fullWidth
                            variant="outlined"
                            onClick={() => setIsOpenDialog(true)}> Add filters </Button>
                </div>
                <div className={'filter'}>
                    <Button style={{backgroundColor: '#85586F'}}
                            fullWidth
                            variant="contained" sx={{ px: '40px' }}
                            endIcon={<SearchIcon/>} onClick={() => handleSubmit(data)}>Search</Button>
                </div>
            </div>

            <Dialog
                fullScreen={false}
                open={isOpenDialog}
                onClose={() => setIsOpenDialog(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Additional filters"}
                </DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    Let Google help apps determine location. This means sending anonymous*/}
                    {/*    location data to Google, even when no apps are running.*/}
                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setIsOpenDialog(false)}>
                        Close
                    </Button>
                    <Button onClick={() => {}} autoFocus> {/* TODO additional func should be created */}
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SearchBarSection;