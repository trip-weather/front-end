import * as React from 'react';
import {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PasswordIcon from '@mui/icons-material/Password';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate, useParams} from 'react-router-dom';
import NotificationContext from '../contexts/notification.context';
import {resetPassword} from "../services/UserService";

const defaultTheme = createTheme();

export default function ResetPassword() {
    const {resetKey} = useParams();
    const navigate = useNavigate();
    const {notification, setNotification} = useContext(NotificationContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        resetPassword(data, resetKey)
            .then((response) => {
                console.log(response.data);
                setNotification({message: 'Successful reset password! Sign in!', active: false, severity: 'success'});
                navigate('/sign-in')
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                        <PasswordIcon/>
                    </Avatar>
                    <Typography>
                        Въведете новата си парола.
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="password"
                            autoComplete="password"
                            type='password'
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}