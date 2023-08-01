import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HolidayVillageTwoToneIcon from '@mui/icons-material/HolidayVillageTwoTone';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext, {AuthDefaults} from '../contexts/auth.context';
import {removeAuthToken} from '../services/AuthServicce';
import {useNavigate} from 'react-router-dom';
import NotificationContext from '../contexts/notification.context';


const pages = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavigationMenu() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {userAuth, updateUserAuth} = useContext(AuthContext);
    const {notification, setNotification} = useContext(NotificationContext)
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        removeAuthToken();
        updateUserAuth(AuthDefaults)
        setNotification({message: 'Logout!', active: true, severity: 'info'});
        navigate('/sign-in');
    }

    return (
        <AppBar position="static" style={{backgroundColor: '#D0B8A8'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HolidayVillageTwoToneIcon sx={{display: {xs: 'none', md: 'flex', color: '#fff !important'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        style={{
                            marginRight: '2rem',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#fff',
                            textDecoration: 'none',
                        }}
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                        }}
                    >
                        WeatherTrip
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >

                            {userAuth.isAuthenticated && <NavLink to={"/profile"}>Profile</NavLink>}
                            {!userAuth.isAuthenticated && <NavLink to={"/sign-in"}>Login</NavLink>}
                            {!userAuth.isAuthenticated && <NavLink to={"/sign-up"}>Register</NavLink>}
                            {userAuth.isAuthenticated && <Button variant="text"
                                                                 to={"/logout"}
                                                                 onClick={() => logout()}> Logout </Button>}
                        </Menu>
                    </Box>
                    <HolidayVillageTwoToneIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Weather Trip
                    </Typography>
                    {/* Main navigation */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {userAuth.isAuthenticated && <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }} to={"/search"}>Search</NavLink>}
                        {userAuth.isAuthenticated && <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }} to={"/"}>Home</NavLink>}
                        {!userAuth.isAuthenticated && <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                        }} to={"/sign-in"}>Login</NavLink>}
                        {!userAuth.isAuthenticated && <NavLink style={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            marginRight: '20px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }} to={"/sign-up"}>Register</NavLink>}
                        {/*{userAuth.isAuthenticated && <Button style={{*/}
                        {/*    my: 2,*/}
                        {/*    color: 'white',*/}
                        {/*    display: 'block',*/}
                        {/*    marginRight: '20px',*/}
                        {/*    textDecoration: 'none'*/}
                        {/*}} variant="text" to={"/logout"} onClick={() => logout()}> Logout </Button>}*/}
                    </Box>
                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                                <Avatar sx={{ backgroundColor: '#85586F'}}>M</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem></MenuItem>
                            {/*{settings.map((setting) => (*/}
                            {/*    <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                            {/*        <Typography textAlign="center">{setting}</Typography>*/}
                            {/*    </MenuItem>*/}
                            {/*))}*/}

                            {userAuth.isAuthenticated && <Button variant="text"
                                                                 to={"/logout"}
                                                                 onClick={() => logout()}> Logout </Button>}

                            {userAuth.isAuthenticated && <NavLink to={"/profile"}>Profile</NavLink>}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavigationMenu;
