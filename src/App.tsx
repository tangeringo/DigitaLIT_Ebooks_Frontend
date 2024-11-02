import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

import variables from './data/variables/variables.static.json';
import books from './data/books/books.library.json';
import { RouteOptions, BooksLibrary } from './data/types/types.global';
import { darkTheme, lightTheme } from './styles/styles.global';


import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCurrentTheme } from './redux/theme/theme.selectors';
import { checkUserSession } from './redux/user/user.actions';

import Navigation from './routes/navigation/navigation.route';
import HomePage from './routes/home/home.route';
import LoginPage from './routes/login/login.route';
import RegisterPage from './routes/register/register.route';
import ProfilePage from './routes/profile/profile.route';
import ResetPasswordPage from './routes/reset-password/resetPassword.route';
import MyBooksPage from './routes/my-books/myBooks.route';
import LibraryPage from './routes/library/library.route';
import ThemeToggler from './components/theme-toggler/themeToggler.component';
import PdfEditor from './routes/edit-pdf/editPdf.route';
import UploadBook from './routes/upload-book/uploadBook.route';
import CheckoutPage from './routes/checkout/checkout.route';
import LoadingSpinner from './components/loading-spinner/loadingSpinner.component';
import { selectRememberMe } from './redux/auth/auth.selectors';


const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [route, setRoute] = useState<RouteOptions>("/");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = useSelector(selectCurrentUser);
  const currentTheme = useSelector(selectCurrentTheme);
  const rememberMe = useSelector(selectRememberMe);
  const theme = currentTheme === 'light'? lightTheme : darkTheme;
  const currentUserInfo = !!(currentUser?.accessToken && currentUser?.refreshToken);
  const filterBooksByCategory = (category: keyof BooksLibrary) => books[category].filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const dispatch = useDispatch();
  
  const filteredBooks = Object.keys(books).map(category => {
    const genre = category as keyof BooksLibrary;
    return {
      genre: genre.charAt(0).toUpperCase() + genre.slice(1),
      books: filterBooksByCategory(genre)
    };
  });

  useEffect(() => {
    const checkTokensAndSession = () => {
      if (!currentUser) {
        dispatch(checkUserSession());
      } else {
        setIsLoading(false); // Hide spinner if tokens are already present
      }
    };

    checkTokensAndSession();
  }, [dispatch, currentUser, rememberMe]);

  return (
    <div>
      <Navigation brandName={variables.appName} route={route} setSearchTerm={setSearchTerm}/>
      { route === variables.routes.editPdf? null : <ThemeToggler currentTheme={currentTheme}/> }
      <Routes>
        <Route index path={variables.routes.home} element={
          currentUserInfo? (
            isLoading ? <LoadingSpinner theme={theme} /> : <HomePage theme={theme} setRoute={setRoute} />
          ) : <Navigate to={variables.routes.login} />
        } />
        <Route path={variables.routes.login} element={<LoginPage theme={theme} setRoute={setRoute} />} />
        <Route path={variables.routes.register} element={<RegisterPage theme={theme} setRoute={setRoute} />} />
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


// BUSINESS STEPS  (not that important):

// 4.) creating the overview for pdf pricing, suplier database
// 5.) cold outreaching the supliers stores that have the literature
// 6.) translating the book into a ".pdf" format and hosting on our server


// TODO: reset password and validate password strongness