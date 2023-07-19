import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Avatar, Paper, Typography,} from '@material-ui/core';
import {CircularProgress, Tab} from "@mui/material";
import {TabContext} from "@mui/lab";
import Box from "@mui/material/Box";
import axios from "axios";
import {API_URL_FULL, JWT_LOCAL_STORAGE_KEY} from "../shared/constants";
import {getUserUuid} from "../services/AuthServicce";

// const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '2rem auto',
        maxWidth: 600,
        padding: theme.spacing(4),
        backgroundColor: '#F4F4F4',
        borderRadius: theme.spacing(2),
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(4),
    },
    avatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
        border: '4px solid #FFF',
    },
    title: {
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    info: {
        marginBottom: theme.spacing(1),
        textAlign: 'center',
        color: '#555',
        letterSpacing: 0.5,
    },
    bio: {
        marginTop: theme.spacing(4),
        textAlign: 'center',
        color: '#777',
        fontStyle: 'italic',
    },
    favoriteHotelsContainer: {
        marginTop: theme.spacing(4),
    },
    favoriteHotelCard: {
        marginBottom: theme.spacing(2),
    },
    favoriteHotelMedia: {
        height: 160,
    },
}));


const ProfilePage = () => {
    const classes = useStyles();

    const [tab, setTab] = React.useState('favourite');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const userUuid = getUserUuid();
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${API_URL_FULL}/user/${userUuid}/profile`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(JWT_LOCAL_STORAGE_KEY),
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                setUserData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setIsLoading(false);
            });
    }, [userUuid]);

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        location: 'New York, USA',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lectus risus.',
        avatar: '/path/to/avatar.jpg',
        favoriteHotels: [
            {
                id: 1,
                name: 'Hotel A',
                photo: '/path/to/hotelA.jpg',
            },
            {
                id: 2,
                name: 'Hotel B',
                photo: '/path/to/hotelB.jpg',
            },
            {
                id: 3,
                name: 'Hotel C',
                photo: '/path/to/hotelC.jpg',
            },
        ],
    };

    return (
        <>
            { isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            }
            {
                !isLoading &&
                <Paper sx={{mt: 2}} className={classes.root}>
                    <div className={classes.avatarContainer}>
                        <Avatar className={classes.avatar} src={user.avatar} alt="User Avatar"/>
                    </div>
                    <Typography variant="h4" className={classes.title}>
                        {userData.firstName + ' ' + userData.lastName}
                    </Typography>
                    <div>
                        <TabContext value={tab}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Personal information" value="info"/>
                                    <Tab label="Favourite Hotels" value="favourite"/>
                                    <Tab label="Reservations    " value="reserved"/>
                                </TabList>
                            </Box>
                            <TabPanel value="favourite">Item One</TabPanel>
                            <TabPanel value="reserved">Item Two</TabPanel>
                            <TabPanel value="info">
                                <Typography variant="h6" className={classes.info}>
                                    Email: {user.email}
                                </Typography>
                            </TabPanel>
                        </TabContext>
                    </div>

                </Paper>
            }

        </>

    )
};

export default ProfilePage;