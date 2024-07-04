import React, { useEffect } from 'react';
import { RouteProps } from '../../globalTypes';
import { loginRoute, myBooksRoute, showBook } from '../../variables';

import { businessBooks } from '../../data/dummyData';  // later ALL the purchased books

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { selectCurrentUserTokens } from '../../redux/user/user.selectors';

import BookItemComponent from '../../components/book-item/bookItem.component';

import { MyBooksContainer } from './myBooks.styles';
import { ThemeProvider } from 'styled-components';




const MyBooks: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const MyBooksData = businessBooks.filter((_, idx) => idx < 4);
    const currentUserTokens = useSelector(selectCurrentUserTokens);
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (navbarToggler as HTMLElement)?.click();
      }, [navbarToggler]);

    useEffect(() => {
        if (!currentUserTokens?.access && !currentUserTokens?.refresh) { navigate(loginRoute) }
    }, [currentUserTokens?.access, currentUserTokens?.refresh, navigate]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(myBooksRoute);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <MyBooksContainer>
                {MyBooksData.map(book => (<BookItemComponent key={book.id} book={book} buttonName={showBook}/>))}
            </MyBooksContainer>
        </ThemeProvider>
    );
}

export default MyBooks;