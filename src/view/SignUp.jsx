import * as React from 'react';
import {useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import NotificationContext from '../contexts/notification.context';
import {registerUser} from "../services/UserService";


const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const {notification, setNotification} = useContext(NotificationContext);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);

        if (username.length < 3) {
            setUsernameError('Username must be between 4 and 20 characters.')
        } else {
            setUsernameError('');
        }
    }
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);

        if (firstName.length < 3) {
            setFirstNameError('First name length must be greater than 3.')
        } else {
            setFirstNameError('');
        }
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);

        if (lastName.length < 3) {
            setLastNameError('Last name length must be greater than 3.')
        } else {
            setLastNameError('');
        }
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        if (!value.includes('@')) {
            setEmailError('Email must contains @.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        if (value.length < 5 || value.length > 50) {
            setPasswordError('Password must be between 5 and 50 characters.');
        } else {
            setPasswordError('');
        }

        if (value !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match.');
            setPasswordMatch(false);
        } else {
            setRepeatPasswordError('');
            setPasswordMatch(true);
        }
    };

    const handleRepeatPasswordChange = (event) => {
        const value = event.target.value;
        setRepeatPassword(value);

        if (value.length < 5 || value.length > 50) {
            setRepeatPasswordError('Password must be between 5 and 50 characters.');
        } else if (value !== password) {
            setRepeatPasswordError('Passwords do not match.');
        } else {
            setRepeatPasswordError('');
        }

        setPasswordMatch(value === password);
    };
    const isFormValid = () => {
        return (
            !isFieldEmpty(email) &&
            !isFieldEmpty(password) &&
            !isFieldEmpty(repeatPassword) &&
            !isFieldEmpty(firstName) &&
            !isFieldEmpty(lastName) &&
            !isFieldEmpty(username) &&
            !emailError &&
            !passwordError &&
            !repeatPasswordError &&
            !firstNameError &&
            !lastNameError &&
            !usernameError
        );
    };

    const isFieldEmpty = (fieldValue) => {
        return fieldValue.trim() === '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        registerUser(data)
            .then((response) => {
                console.log(response.data);
                setNotification({message: 'Successful registration!', active: true, severity: 'success'});
                navigate('/sign-in');
            })
            .catch((error) => {
                const {data} = error.response;

                if (data === 'Username is already used!') {
                    setUsernameError(data);
                } else if (data === 'Email is already used!') {
                    setEmailError(data);
                }
            });
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleFirstNameChange}
                                    error={!!firstNameError}
                                    helperText={firstNameError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleLastNameChange}
                                    error={!!lastNameError}
                                    helperText={lastNameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="username"
                                    label="Username"
                                    id="username"
                                    autoComplete="username"
                                    onChange={handleUsernameChange}
                                    error={!!usernameError}
                                    helperText={usernameError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleEmailChange}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(event) => {
                                        handlePasswordChange(event);
                                    }}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="repeatedPassword"
                                    label="Repeat password"
                                    type="password"
                                    id="repeatedPassword"
                                    autoComplete="repeatedPassword"
                                    onChange={(event) => {
                                        handleRepeatPasswordChange(event);
                                    }}
                                    error={!!repeatPasswordError}
                                    helperText={repeatPasswordError}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{backgroundColor: '#85586F'}}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!isFormValid()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}