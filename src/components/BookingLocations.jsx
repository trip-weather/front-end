import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

const RAPPID_API_KEY = 'c64ff6fea1msh678c4f26cf2708cp188304jsn49c64882facf';

function searchLocation(inputValue, callback) {
    fetch(`https://booking-com.p.rapidapi.com/v1/hotels/locations?locale=en-gb&name=${inputValue}`,{
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c64ff6fea1msh678c4f26cf2708cp188304jsn49c64882facf',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const results = data.locations.map(location => ({
                description: location.name,
                place_id: location.id,
                structured_formatting: {
                    main_text: location.name,
                    secondary_text: location.address
                }
            }));
            callback(results);
        })
        .catch(error => {
            console.error('Error searching location:', error);
            callback([]);
        });
}

export default function LocationSearch({ setCity }) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    const fetch = React.useMemo(
        () =>
            debounce((request, callback) => {
                searchLocation(request.inputValue, callback);
            }, 400),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="rappid-location-search"
            sx={{ width: 300 }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={(event, newValue) => {
                console.log('on change');
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                console.log(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Search location" fullWidth />
            )}
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length])
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid
                                item
                                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
                            >
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}
