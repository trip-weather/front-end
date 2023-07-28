import './App.css';
import SignIn from './view/SignIn';
import SignUp from './view/SignUp';
import {useState} from 'react';
import AuthContext, {AuthDefaults} from './contexts/auth.context';

import RootLayout from './layouts/RootLayout';
import Profile from './view/ProfilePage';
import PublicRoutes from './routes/PublicRoutes';

import {BrowserRouter, Route, Routes,} from "react-router-dom";
import ForgottenPassword from './view/ForgottenPassword';
import ResetPassword from './view/ResetPassword';
import PrivateRoutes from './routes/PrivateRoutes';
import SearchPage from './view/SearchPage';
import SingleHotelPage from "./view/SingleHotelPage";
import ActivateProfile from "./components/ActivateProfile";
import PaymentOutcome from "./view/PaymentOutcome";


function App() {
    const [userAuth, updateUserAuth] = useState(AuthDefaults);
    console.log(userAuth);
    return (
        <AuthContext.Provider value={{userAuth, updateUserAuth}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RootLayout/>}>
                        <Route element={<PublicRoutes/>}>
                            <Route path='/sign-up' element={<SignUp/>}></Route>
                            <Route path='/sign-in' element={<SignIn/>}></Route>
                            <Route path='/reset-password' element={<ResetPassword/>}></Route>
                            <Route path='/forgotten-password' element={<ForgottenPassword/>}></Route>
                            <Route path='/reset-password/:resetKey' element={<ResetPassword/>}></Route>
                        </Route>
                        <Route element={<PrivateRoutes/>} exact>
                            <Route path='/profile' element={<Profile/>}></Route>
                            <Route path='/search' element={<SearchPage/>}></Route>
                            <Route path='/payment-outcome' element={<PaymentOutcome/>}></Route>
                        </Route>
                        <Route path='/hotel/:id' element={<SingleHotelPage/>}></Route>
                        <Route path='/activate' element={<ActivateProfile/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
