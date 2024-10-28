import React, { useEffect } from 'react';
import { RouteProps } from '../../data/types/types.global';
import variables from '../../data/variables/variables.static.json';

import purchasedBooks from '../../data/books/books.purchased.json';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import BookItemComponent from '../../components/book-item/bookItem.component';

import { MyBooksContainer } from './myBooks.styles';
import { ThemeProvider } from 'styled-components';


const MyBooks: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const MyBooksData = purchasedBooks.filter((_, idx) => idx < 4);
    const currentUser = useSelector(selectCurrentUser);
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (navbarToggler as HTMLElement)?.click();
      }, [navbarToggler]);

    useEffect(() => {
        if (!currentUser?.accessToken && !currentUser?.refreshToken) { navigate(variables.routes.login) }
    }, [currentUser?.accessToken, currentUser?.refreshToken, navigate]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.myBooks);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <MyBooksContainer>
                {MyBooksData.map(book => (<BookItemComponent key={book.id} book={book} buttonName={variables.buttons.showBook}/>))}
            </MyBooksContainer>
        </ThemeProvider>
    );
}

export default MyBooks;