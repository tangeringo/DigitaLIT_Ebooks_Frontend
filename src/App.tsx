import React, { useEffect, useState } from 'react';
import useLocalStorage from "use-local-storage";
import "bootstrap/dist/css/bootstrap.css";

import { businessBooks, itBooks, physicsBooks, psychologyBooks } from './data/dummyData';
import { RouteOptions } from './globalTypes';
import { darkTheme, lightTheme } from './styles/globalStyles.styles';


import { Routes, Route, Navigate } from 'react-router-dom'; 
import { appName, homeRoute, loginRoute, createAccountRoute, resetPasswordRoute, profileRoute, myBooksRoute, libraryRoute, checkoutRoute, editPdfRoute } from './variables';

import Navigation from './routes/navigation/Navigation';
import HomePage from './routes/home/Home';
import LoginPage from './routes/login/Login';
import CreateAccountPage from './routes/create-account/CreateAccount';
import ProfilePage from './routes/profile/Profile';
import ResetPasswordPage from './routes/reset-password/ResetPassword';
import MyBooksPage from './routes/my-books/MyBooks';
import LibraryPage from './routes/library/Library';
import ThemeToggler from './components/theme-toggler/themeToggler.component';
import PdfEditor from './routes/edit-pdf/EditPdf';
import CheckoutPage from './routes/checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserTokens } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';



const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [route, setRoute] = useState<RouteOptions>("/");
  const [themeTitle, setThemeTitle] = useLocalStorage('light', 'dark');
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const currentUserTokens = useSelector(selectCurrentUserTokens);
  const dispatch = useDispatch();

  const theme = themeTitle === 'light'? lightTheme : darkTheme;
  const filteredBusinessBooks = businessBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPsychologyBooks = psychologyBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredItBooks = itBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPhysicsBooks = physicsBooks.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const filteredBooks = [ 
    { genre: "Business", books: [...filteredBusinessBooks] },
    { genre: "Psychology", books: [...filteredPsychologyBooks] },
    { genre: "Technology", books: [...filteredItBooks] },
    { genre: "Physics", books: [...filteredPhysicsBooks] }
  ];


  if (navbarCollapse?.classList.contains('show')) {
    (navbarToggler as HTMLElement)?.click();
  }

  const isUserAuthenticated = () => { return (currentUserTokens?.access && currentUserTokens?.refresh) }


// what does this do exactly?
  useEffect(() => {
    dispatch(checkUserSession());
}, [dispatch]);


  return (
    <div>
      <Navigation brandName={appName} route={route} setSearchTerm={setSearchTerm}/>
      { route === editPdfRoute? null : <ThemeToggler themeTitle={themeTitle} setThemeTitle={setThemeTitle}/> }
      <Routes>
        <Route index path={homeRoute} element={isUserAuthenticated()? <HomePage theme={theme} setRoute={setRoute}/> : <Navigate to={loginRoute}/>} />
        <Route path={loginRoute} element={<LoginPage theme={theme} setRoute={setRoute}/>} />
        <Route path={createAccountRoute} element={<CreateAccountPage theme={theme} setRoute={setRoute}/>} />
        <Route path={resetPasswordRoute} element={<ResetPasswordPage theme={theme} setRoute={setRoute}/>}/>
        <Route path={profileRoute} element={<ProfilePage theme={theme} setRoute={setRoute}/>} />
        <Route path={myBooksRoute} element={<MyBooksPage theme={theme} setRoute={setRoute}/>} />
        <Route path={editPdfRoute} element={<PdfEditor theme={theme} setRoute={setRoute} />} />
        <Route path={libraryRoute} element={<LibraryPage theme={theme} filteredBooks={filteredBooks} setRoute={setRoute}/>} />
        <Route path={checkoutRoute} element={<CheckoutPage theme={theme} setRoute={setRoute}/>} />
      </Routes>
    </div>
  );
}

export default App;






// BUSINESS STEPS  (not that important):

// 4.) creating the overview for pdf pricing, suplier database
// 5.) cold outreaching the supliers stores that have the literature
// 6.) translating the book into a ".pdf" format and hosting on our server



