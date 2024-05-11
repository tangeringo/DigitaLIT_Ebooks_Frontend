import React, { useEffect } from 'react';
import { RouteProps } from '../../globalTypes';
import { myBooksRoute, showBook } from '../../variables';

import { bookData } from '../../data/dummyData';  // later ALL the purchased books

import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';

import BookItemComponent from '../../components/book-item/bookItem.component';

import { MyBooksContainer } from './myBooks.styles';
import { ThemeProvider } from 'styled-components';



const MyBooks: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const dispatch = useDispatch();
    const MyBooksData = bookData.filter((_, idx) => idx < 4)

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