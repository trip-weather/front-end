import './App.css';
import SignIn from './view/SignIn';
import SignUp from './view/SignUp';
import { useState } from 'react';
import { AuthDefaults } from './contexts/auth.context';
import AuthContext from './contexts/auth.context';

import RootLayout from './layouts/RootLayout';
import Profile from './view/Profile';
import PublicRoutes from './routes/PublicRoutes';

import {
  BrowserRouter,
  Route,
  Routes,
}
  from "react-router-dom";
import ForgottenPassword from './view/ForgottenPassword';
import ResetPassword from './view/ResetPassword';
import PrivateRoutes from './routes/PrivateRoutes';
import HotelSection from './layouts/HotelSection';
import { Typography } from '@mui/material';


function App() {
  const [userAuth, updateUserAuth] = useState(AuthDefaults);
  console.log(userAuth);
  return (
    <AuthContext.Provider value={{ userAuth, updateUserAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />} >
            <Route element={<PublicRoutes />}>
              <Route path='/sign-up' element={<SignUp />}></Route>
              <Route path='/sign-in' element={<SignIn />} ></Route>
              <Route path='/reset-password' element={<ResetPassword />}></Route>
              <Route path='/forgotten-password' element={<ForgottenPassword />}></Route>
            </Route>
            <Route element={<PrivateRoutes />} exact>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/sugestion' element={<HotelSection />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider >
  );
}

export default App;
