import {Typography} from "@material-ui/core";
import {Button} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '4rem',
        alignItems: "center",
        height: "20rem",
        backgroundColor: "#f5f5f5",
        color: "#333",
    },
    text: {
        paddingTop: '2rem',
        textAlign: "center",
        marginBottom: theme.spacing(2),
        fontWeight: "bold",
        fontSize: "3rem",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        color: "#85586F",
    },
    description: {
        paddingBottom: '2rem',
        textAlign: "center",
        fontSize: "1.2rem",
        lineHeight: "1.6",
        color: "#666666",
    },
}));
const NotFound = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography variant="h4" className={classes.text}>
                404 Not Found
            </Typography>
            <Typography variant="body1" className={classes.description}>
                Oops! Looks like you've reached a wrong destination.
            </Typography>
            <Box textAlign='center'>
                <Button variant="contained" href="/" style={{backgroundColor: '#85586F'}}>
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;