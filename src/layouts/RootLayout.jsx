import { Alert, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NotificationContext from "../contexts/notification.context";
import NavigationMenu from "./NavigationMenu";

export default function RootLayout() {
    const [notification, setNotification] = useState({ active: false, message: '', severity: 'success' });
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            <div className="root-layout">
                <header>
                    <NavigationMenu></NavigationMenu>
                </header>

                <main>
                    <Outlet />
                </main>
                <Snackbar open={notification.active} autoHideDuration={6000} onClose={() => setNotification({ ...notification, active: false })}>
                    <Alert onClose={() => setNotification({ ...notification, active: false })} severity={notification.severity} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </div>
        </NotificationContext.Provider>
    )
}