import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Avatar, Paper, Typography,} from '@material-ui/core';
import {CircularProgress, Tab} from "@mui/material";
import {TabContext} from "@mui/lab";
import Box from "@mui/material/Box";
import {getUserUuid} from "../services/AuthServicce";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {changePassword, getProfile, updateUser} from "../services/UserService";
import NotificationContext from "../contexts/notification.context";
import '../css/profile-page.css'
import FavoriteHotelCard from "../components/FavouriteHotelCard";


const ProfilePage = () => {

    const {notification, setNotification} = useContext(NotificationContext);

    const [tab, setTab] = React.useState('info');
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleDataChange = (event) => {
        const {name, value} = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handlePasswordDataChange = (event) => {
        const {name, value} = event.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };


    const userUuid = getUserUuid();
    useEffect(() => {
        setIsLoading(true);

        getProfile()
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


    function handleChangePassword(event) {
        event.preventDefault();

        changePassword(passwordData)
            .then(response => {
                console.log("Success")
                setNotification({active: true, message: "Successful changed password", severity: 'success'});

                setPasswordData({
                    oldPassword: '',
                    newPassword: ''
                });
            })
            .catch(error => {
                console.log(error.message)
                setNotification({active: true, message: "Invalid current password", severity: 'error'})
            });
    }

    function handleUpdateUser(event) {
        event.preventDefault();

        updateUser(userData)
            .then(response => {
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                setIsLoading(false);
            });
    }

    return (
        <>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            }
            {
                !isLoading &&
                <Paper sx={{mt: 2}} className="root">
                    <div className="avatarContainer">
                        <Avatar className="avatar" src={'/path/to/avatar.jpg'} alt="User Avatar"/>
                    </div>
                    <Typography variant="h4" className="title">
                        {userData.firstName + ' ' + userData.lastName}
                    </Typography>
                    <div>
                        <TabContext value={tab}>
                            <Box sx={{borderBottom: 1, borderColor: '#85586F', color: '#85586F'}}>
                                <TabList
                                    onChange={handleTabChange} aria-label="lab API tabs example"
                                    style={{color: '#85586F'}}>
                                    <Tab label="Personal information" value="info"/>
                                    <Tab label="Change Password" value="password"/>
                                    <Tab label="Favourite Hotels" value="favourite"/>
                                    <Tab label="Reservations" value="reserved"/>
                                </TabList>
                            </Box>
                            <TabPanel value="favourite">
                                <div>
                                    {userData.favouriteHotels.map((hotel) => (
                                        <FavoriteHotelCard
                                            key={hotel.externalId}
                                            id={hotel.externalId}
                                            hotelName={hotel.name}
                                            city={hotel.city}
                                            imageUrl={hotel.photoMainUrl}
                                        />
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel value="password">
                                <form onSubmit={handleChangePassword}>
                                    <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Old password"
                                                variant="outlined"
                                                name="oldPassword"
                                                type="password"
                                                value={passwordData.oldPassword}
                                                onChange={handlePasswordDataChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="New password"
                                                variant="outlined"
                                                name="newPassword"
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordDataChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                style={{backgroundColor: '#85586F'}}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className="submitButton"
                                            >
                                                Change Password
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>

                            </TabPanel>
                            <TabPanel value="reserved">Item Two</TabPanel>
                            <TabPanel value="info">
                                <form onSubmit={handleUpdateUser}>
                                    <Grid container spacing={3} justifyContent="center">
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Username"
                                                variant="outlined"
                                                name="username"
                                                value={userData.username}
                                                fullWidth
                                                disabled={true}
                                                readOnly
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                value={userData.email}
                                                disabled={true}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="First Name"
                                                variant="outlined"
                                                name="firstName"
                                                value={userData.firstName}
                                                onChange={handleDataChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                label="Last Name"
                                                variant="outlined"
                                                name="lastName"
                                                value={userData.lastName}
                                                onChange={handleDataChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{backgroundColor: '#85586F'}}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    className="submitButton"
                                            >
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </TabPanel>
                        </TabContext>
                    </div>
                </Paper>
            }
        </>
    )
};


export default ProfilePage;