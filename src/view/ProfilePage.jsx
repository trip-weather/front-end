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

// const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '2rem auto',
        maxWidth: 600,
        padding: theme.spacing(4),
        // backgroundColor: '#F4F4F4',
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
                <Paper sx={{mt: 2}} className={classes.root}>
                    <div className={classes.avatarContainer}>
                        <Avatar className={classes.avatar} src={'/path/to/avatar.jpg'} alt="User Avatar"/>
                    </div>
                    <Typography variant="h4" className={classes.title}>
                        {userData.firstName + ' ' + userData.lastName}
                    </Typography>
                    <div>
                        <TabContext value={tab}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                    <Tab label="Personal information" value="info"/>
                                    <Tab label="Change Password" value="password"/>
                                    <Tab label="Favourite Hotels" value="favourite"/>
                                    <Tab label="Reservations" value="reserved"/>
                                </TabList>
                            </Box>
                            <TabPanel value="favourite">Item One</TabPanel>
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
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submitButton}
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
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.submitButton}
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