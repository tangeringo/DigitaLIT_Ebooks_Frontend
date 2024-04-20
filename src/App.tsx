import React, { useState } from 'react';
import useLocalStorage from "use-local-storage";
import "bootstrap/dist/css/bootstrap.css";

import { bookData } from './data/dummyData';   // use real data in the app
import { RouteOptions } from './globalTypes';
import { darkTheme, lightTheme } from './styles/globalStyles.styles';


import { Routes, Route } from 'react-router-dom'; 
import { appName, homeRoute, loginRoute, createAccountRoute, resetPasswordRoute, profileRoute, myBooksRoute, libraryRoute, checkoutRoute, editPdfRoute } from './variables';

import Navigation from './routes/navigation/Navigation';
import HomePage from './routes/home/Home';
import LoginPage from './routes/login/Login';
import CreateAccountPage from './routes/create-account/CreateAccount';
import ProfilePage from './routes/profile/Profile';
import ResetPasswordPage from './routes/reset-password/ResetPassword';
import MyBooks from './routes/my-books/MyBooks';
import LibraryPage from './routes/library/Library';
import CheckoutPage from './routes/checkout/Checkout';
import ThemeToggler from './components/theme-toggler/themeToggler.component';
import PdfEditor from './routes/edit-pdf/EditPdf';



const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [route, setRoute] = useState<RouteOptions>("/");
  const [themeTitle, setThemeTitle] = useLocalStorage('light', 'dark');

  const theme = themeTitle === 'light'? lightTheme : darkTheme;
  const filteredBooks = bookData.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div>
      <Navigation brandName={appName} route={route} setSearchTerm={setSearchTerm}/>
      { route === editPdfRoute? null : <ThemeToggler themeTitle={themeTitle} setThemeTitle={setThemeTitle}/> }
      <Routes>
        <Route index path={homeRoute} element={<HomePage theme={theme} setRoute={setRoute}/>}/>
        <Route path={loginRoute} element={<LoginPage theme={theme} setRoute={setRoute}/>} />
        <Route path={createAccountRoute} element={<CreateAccountPage theme={theme} setRoute={setRoute}/>} />
        <Route path={resetPasswordRoute} element={<ResetPasswordPage theme={theme} setRoute={setRoute}/>}/>
        <Route path={profileRoute} element={<ProfilePage theme={theme} setRoute={setRoute}/>} />
        <Route path={myBooksRoute} element={<MyBooks theme={theme} setRoute={setRoute}/>} />
        <Route path={editPdfRoute} element={<PdfEditor theme={theme} setRoute={setRoute} />} />
        <Route path={libraryRoute} element={<LibraryPage theme={theme} filteredBooks={filteredBooks} setRoute={setRoute}/>} />
        <Route path={checkoutRoute} element={<CheckoutPage theme={theme} setRoute={setRoute}/>} />
      </Routes>
    </div>
  );
}

export default App;






// 6.) implement redux saga - exporting all the functions



// BUSINESS STEPS  (SUPER IMPORTANT):

// 1.) adding all the code to the purchased cloud --FAST
// 2.) programming the server (microservices) and adding the code to the purchased cloud
// 2.1.) connecting client + server

// 3.) creating the database and adding to the purchased cloud
// 3.1.) connecting server + database


// BUSINESS STEPS  (not that important):

// 4.) creating the overview for pdf pricing, suplier database
// 5.) cold outreaching the supliers stores that have the literature
// 6.) translating the book into a ".pdf" format and hosting on our server




