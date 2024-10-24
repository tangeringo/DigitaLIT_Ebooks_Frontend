import { useState, useEffect } from 'react';
import { LibraryPageProps, CartItemInfo } from '../../data/types/types.global';
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { selectCurrentUserTokens } from '../../redux/user/user.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { selectIsSideBarOpen, selectTargetBookItem } from '../../redux/library/library.selectors';


import BookItemComponent from '../../components/book-item/bookItem.component';
import { ThemeProvider } from 'styled-components';
import { 
    ContainerWrapper, 
    BookItemsWrapperContainer, 
    SideBarSection, 
    NoMatchesText 
} from './library.styles';

import { setOpenSideBar } from '../../redux/library/library.actions';
import SubmitButton, { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';
import GenreRowComponent from '../../components/genre-row/genreRow.component';

const LibraryPage = ({ theme, filteredBooks, setRoute }: LibraryPageProps): JSX.Element => {
    const [cartItemInfo, setCartItemInfo] = useState<CartItemInfo>(variables.defaultStates.cartItemInfo);
    // const navbarToggler = document.querySelector(".navbar-toggler");   // in case you want to close the navigation popup
    const selectedBook = useSelector(selectTargetBookItem);
    const isSideBarOpen = useSelector(selectIsSideBarOpen);
    const currentUserTokens = useSelector(selectCurrentUserTokens);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closeSideWrapperContainer = () => {
        setCartItemInfo(variables.defaultStates.cartItemInfo);
        dispatch(setOpenSideBar(false));
    }

    // in case you want to close the navigation popup
    // useEffect(() => {
    //     (navbarToggler as HTMLElement)?.click();
    //   }, [navbarToggler]);

    useEffect(() => {
        if (!currentUserTokens?.access && !currentUserTokens?.refresh) { navigate(variables.routes.login) }
    }, [currentUserTokens?.access, currentUserTokens?.refresh, navigate]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.login);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <ContainerWrapper>
                {filteredBooks.length?
                    <ContainerWrapper>

                        <BookItemsWrapperContainer isSideBarOpen={isSideBarOpen}>
                            {filteredBooks.map(item => (
                                <GenreRowComponent key={item.genre} genre={item.genre} books={item.books} cartItemInfo={cartItemInfo} setCartItemInfo={setCartItemInfo}/>
                            ))}
                        </BookItemsWrapperContainer>

                        <SideBarSection showBook={cartItemInfo.showBook}>
                            <SubmitButton onClick={closeSideWrapperContainer} buttonType={BUTTON_TYPE_CLASS.close}>{variables.buttons.close}</SubmitButton>
                            <BookItemComponent book={selectedBook} buttonName={variables.buttons.addToCart}/>
                        </SideBarSection>

                    </ContainerWrapper>
                    :<NoMatchesText>No book matches</NoMatchesText>
                }
            </ContainerWrapper>
        </ThemeProvider>
    );
}


export default LibraryPage;
