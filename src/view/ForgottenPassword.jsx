import * as React from 'react';
import {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NotificationContext from '../contexts/notification.context';
import {forgottenPassword} from "../services/UserService";


const defaultTheme = createTheme();

export default function ForgottenPassword() {
    const {notification, setNotification} = useContext(NotificationContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        forgottenPassword(data)
            .then((response) => {
                console.log(response.data);
                setNotification({message: 'Check your email address !', active: false, severity: 'info'})
                console.log(notification);
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
                        <LockResetIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Забравена парола ?
                    </Typography>
                    <Typography>
                        Въведете вашия емейл, за да получите инструкции за промяна на паролата
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send Email
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}