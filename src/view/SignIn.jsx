import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NotificationContext from '../contexts/notification.context';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getUserName, getUserRole, storeAuthToken} from '../services/AuthServicce';
import AuthContext from '../contexts/auth.context';
import {loginUser} from '../services/UserService';

const defaultTheme = createTheme();

export default function SignIn() {
    const {userAuth, updateUserAuth} = useContext(AuthContext);
    const {notification, setNotification} = useContext(NotificationContext);
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        if (value.length < 4 || value.length > 20) {
            setEmailError('Username must be between 4 and 20 characters.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        if (value.length < 5 || value.length > 50) {
            setPasswordError('Password must be between 4 and 50 characters.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        loginUser(data)
            .then((response) => {
                console.log(response);
                console.log("in login user");
                storeAuthToken(response.data.idToken);
                updateUserAuth({...userAuth, isAuthenticated: true, user: {role: getUserRole, username: getUserName}});
                setNotification({message: 'Succesfull sign in!', active: true, severity: 'success'});
                navigate('/');
            })
            .catch(() => setNotification({active: true, message: "Wrong credentials", severity: 'error'}));
    };

    const handleRememberMe = (event) => {
        setRememberMe(event.target.checked);
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address or username"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <FormControlLabel
                            control={<Checkbox
                                color="primary"
                                checked={rememberMe}
                                onChange={handleRememberMe}/>}
                            id="remember"
                            label="Remember me"
                            name="remember"
                            value={rememberMe}
                        />
                        <Button
                            style={{backgroundColor: '#85586F'}}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgotten-password" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}