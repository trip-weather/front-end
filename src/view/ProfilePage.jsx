import React, {useContext, useEffect, useState} from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Avatar, Paper, Typography,} from '@material-ui/core';
import {CircularProgress, Pagination, Tab} from "@mui/material";
import {TabContext} from "@mui/lab";
import Box from "@mui/material/Box";
import {getUserUuid} from "../services/AuthServicce";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
    changePassword,
    getProfile,
    getUserReservedFlights,
    getUserReservedHotels,
    updateUser
} from "../services/UserService";
import NotificationContext from "../contexts/notification.context";
import '../css/profile-page.css'
import FavoriteHotelCard from "../components/FavouriteHotelCard";
import ReservedFlightTicketCard from "../components/ReservedFlightTicketCard";
import {Link} from "react-router-dom";


const ProfilePage = () => {

    const {notification, setNotification} = useContext(NotificationContext);

    const [tab, setTab] = React.useState('info');
    const [reservationsTab, setReservationsTab] = React.useState('future-hotels');
    const [userData, setUserData] = useState({});
    const [userReservedPastHotels, setUserReservedPastHotels] = useState([]);
    const [userReservedFutureHotels, setUserReservedFutureHotels] = useState([]);
    const [userReservedPastFlights, setUserReservedPastFlights] = useState([]);
    const [userReservedFutureFlights, setUserReservedFutureFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(3);
    const [offset, setOffset] = useState(0);
    const [displayHotels, setDisplayHotels] = useState([]);


    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleReservationsTabChange = (event, newValue) => {
        setReservationsTab(newValue);
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

        getUserReservedHotels('past')
            .then(response => {
                console.log(response.data)
                setUserReservedPastHotels(response.data);
            }).catch(error => {
            console.log(error)
        })

        getUserReservedHotels('future')
            .then(response => {
                console.log(response.data)
                setUserReservedFutureHotels(response.data);
            }).catch(error => {
            console.log(error)
        })

        getUserReservedFlights('past')
            .then(response => {
                setUserReservedPastFlights(response.data);
                console.log(response.data)
            }).catch(error => {
            console.log(error)
        })

        getUserReservedFlights('future')
            .then(response => {
                setUserReservedFutureFlights(response.data);
                console.log(response.data)
            }).catch(error => {
            console.log(error)
        })
    }, [userUuid]);


    useEffect(() => {
        const part = userData.favouriteHotels?.slice(count * offset, (count * offset) + count);
        setDisplayHotels(part || []);

    }, [offset, count, userData.favouriteHotels]);

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
                <Paper sx={{mt: '2rem'}} className="root">
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
                                </TabList>
                            </Box>
                            <TabPanel value="favourite">
                                {/*<div>*/}
                                {/*    {userData.favouriteHotels.map((hotel) => (*/}
                                {/*        <FavoriteHotelCard*/}
                                {/*            key={hotel.externalId}*/}
                                {/*            id={hotel.externalId}*/}
                                {/*            hotelName={hotel.name}*/}
                                {/*            city={hotel.city}*/}
                                {/*            imageUrl={hotel.photoMainUrl}*/}
                                {/*        />*/}
                                {/*    ))}*/}
                                {/*</div>*/}

                                {displayHotels.length > 0 ? (
                                    <div className='favourite-hotel-card'>
                                        {displayHotels.map((hotel) => (
                                            <Link to={`/hotel/${hotel.externalId}`} key={hotel.externalId}>
                                                <FavoriteHotelCard
                                                    key={hotel.externalId}
                                                    id={hotel.externalId}
                                                    hotelName={hotel.name}
                                                    city={hotel.city}
                                                    imageUrl={hotel.photoMainUrl}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div>No added hotels to favourite</div>
                                )
                                }
                                <Grid container
                                      sx={{mt: 4}}
                                      justifyContent="center"
                                      alignItems="center" style={{width: '100%'}}>
                                    <Grid item>
                                        <Pagination count={Math.ceil(userData.favouriteHotels.length / count)}
                                                    onChange={(event, page) => setOffset(page - 1)}
                                                    variant="outlined" color="secondary"/>
                                    </Grid>
                                </Grid>
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
            <TabContext value={reservationsTab}>
                <Box className='tabListContainer'>
                    <TabList centered={true} style={{display: "flex", justifyContent: "center"}}
                             onChange={handleReservationsTabChange}
                             aria-label="lab API tabs example"
                             indicatorColor="primary"
                             textColor="primary"
                    >
                        <Tab className='tab' label="Old Hotel Reservations" value="old-hotels"/>
                        <Tab className='tab' label="Future Hotel Reservations" value="future-hotels"/>
                        <Tab className='tab' label="Old Flight Reservations" value="old-flights"/>
                        <Tab className='tab' label="Future Flight Reservations" value="future-flights"/>
                    </TabList>
                </Box>
                <TabPanel value="old-hotels" className='tabPanel'>
                    <div className='reserved-hotels-wrapper'>
                        {userReservedPastHotels.map((hotel) => (
                            <div className='reserved-hotels-container'>
                                <div className='reserved-hotels-card'>
                                    <div style={{width: '18rem'}}>
                                        <FavoriteHotelCard
                                            key={hotel.externalId}
                                            id={hotel.externalId}
                                            hotelName={hotel.name}
                                            city={hotel.city}
                                            imageUrl={hotel.photoMainUrl}
                                        />
                                    </div>
                                </div>
                                <div className='reservation-container'>
                                    <h4 className='reservation-date'>
                                        Reservation date: {hotel.reservationDate}
                                    </h4>
                                    <h4 className='reservation-date-range'>
                                        Your reservation is from {hotel.checkInDate} to {hotel.checkInDate}
                                    </h4>
                                    <h5 className='reservation-price'>
                                        You paid total price of {hotel.currency} {hotel.price}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="future-hotels" className='tabPanel'>
                    <div className='reserved-hotels-wrapper'>
                        {userReservedFutureHotels.map((hotel) => (
                            <div className='reserved-hotels-container'>
                                <div className='reserved-hotels-card'>
                                    <div style={{width: '18rem'}}>
                                        <FavoriteHotelCard
                                            key={hotel.externalId}
                                            id={hotel.externalId}
                                            hotelName={hotel.name}
                                            city={hotel.city}
                                            imageUrl={hotel.photoMainUrl}
                                        />
                                    </div>
                                </div>
                                <div className='reservation-container'>
                                    <h4 className='reservation-date'>
                                        Reservation date: {hotel.reservationDate}
                                    </h4>
                                    <h4 className='reservation-date-range'>
                                        Your reservation is from {hotel.checkInDate} to {hotel.checkInDate}
                                    </h4>
                                    <h5 className='reservation-price'>
                                        You paid total price of {hotel.currency} {hotel.price}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel value="old-flights" className='tabPanel'>
                    <div className='reserved-flights-wrapper'>
                        {userReservedPastFlights.map((flight) => (
                            <ReservedFlightTicketCard flight={flight}/>
                        ))
                        }
                    </div>
                </TabPanel>
                <TabPanel value="future-flights" className='tabPanel'>
                    <div className='reserved-flights-wrapper'>
                        {userReservedFutureFlights.map((flight) => (
                            <ReservedFlightTicketCard flight={flight}/>
                        ))
                        }
                    </div>
                </TabPanel>
            </TabContext>
        </>
    )
};


export default ProfilePage;