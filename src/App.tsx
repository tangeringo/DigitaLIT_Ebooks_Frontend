import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import variables from './data/variables/variables.static.json';
import books from './data/books/books.library.json';
import { RouteOptions, TokenType } from './data/types/types.global';
import { darkTheme, lightTheme } from './styles/styles.global';


import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserTokens } from './redux/user/user.selectors';
import { selectCurrentTheme } from './redux/theme/theme.selectors';
import { checkUserSession } from './redux/user/user.actions';

import Navigation from './routes/navigation/navigation.route';
import HomePage from './routes/home/home.route';
import LoginPage from './routes/login/login.route';
import CreateAccountPage from './routes/create-account/createAccount.route';
import ProfilePage from './routes/profile/profile.route';
import ResetPasswordPage from './routes/reset-password/resetPassword.route';
import MyBooksPage from './routes/my-books/myBooks.route';
import LibraryPage from './routes/library/library.route';
import ThemeToggler from './components/theme-toggler/themeToggler.component';
import PdfEditor from './routes/edit-pdf/editPdf.route';
import UploadBook from './routes/upload-book/uploadBook.route';
import CheckoutPage from './routes/checkout/checkout.route';



const App: React.FC = () => {
  const [tokens, setTokens] = useState<TokenType>({ access: undefined, refresh: undefined });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [route, setRoute] = useState<RouteOptions>("/");
  const currentUserTokens = useSelector(selectCurrentUserTokens);
  const currentTheme = useSelector(selectCurrentTheme);
  const theme = currentTheme === 'light'? lightTheme : darkTheme;  // throw to redux
  const isUserAuthenticated = () => (currentUserTokens?.access && currentUserTokens?.refresh);
  const dispatch = useDispatch();

  // OPTIMALIZATION NECESSARY
  const filteredBusinessBooks = books.business.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPsychologyBooks = books.psychology.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredItBooks = books.technology.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPhysicsBooks = books.physics.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const filteredBooks = [ 
    { genre: "Business", books: [...filteredBusinessBooks] },
    { genre: "Psychology", books: [...filteredPsychologyBooks] },
    { genre: "Technology", books: [...filteredItBooks] },
    { genre: "Physics", books: [...filteredPhysicsBooks] }
  ];
  // OPTIMALIZATION NECESSARY

  useEffect(() => {
    dispatch(checkUserSession());
}, [dispatch]);


  return (
    <div>
      <Navigation brandName={variables.appName} route={route} setSearchTerm={setSearchTerm}/>
      { route === variables.routes.editPdf? null : <ThemeToggler currentTheme={currentTheme}/> }
      <Routes>
        <Route index path={variables.routes.home} element={isUserAuthenticated()? <HomePage theme={theme} setRoute={setRoute}/> : <Navigate to={variables.routes.login}/>} />
        <Route path={variables.routes.login} element={<LoginPage theme={theme} setRoute={setRoute} tokens={tokens} setTokens={setTokens}/>} />
        <Route path={variables.routes.createAccount} element={<CreateAccountPage theme={theme} setRoute={setRoute} tokens={tokens} setTokens={setTokens}/>} />
        <Route path={variables.routes.resetPassword} element={<ResetPasswordPage theme={theme} setRoute={setRoute}/>}/>
        <Route path={variables.routes.profile} element={<ProfilePage theme={theme} setRoute={setRoute}/>} />
        <Route path={variables.routes.myBooks} element={<MyBooksPage theme={theme} setRoute={setRoute}/>} />
        <Route path={variables.routes.editPdf} element={<PdfEditor theme={theme} setRoute={setRoute} />} />
        <Route path={variables.routes.uploadBook} element={<UploadBook theme={theme} setRoute={setRoute} />} />
        <Route path={variables.routes.library} element={<LibraryPage theme={theme} filteredBooks={filteredBooks} setRoute={setRoute}/>} />
        <Route path={variables.routes.checkout} element={<CheckoutPage theme={theme} setRoute={setRoute}/>} />
      </Routes>
    </div>
  );
}

export default App;

// refreshing access token





// BUSINESS STEPS  (not that important):

// 4.) creating the overview for pdf pricing, suplier database
// 5.) cold outreaching the supliers stores that have the literature
// 6.) translating the book into a ".pdf" format and hosting on our server



