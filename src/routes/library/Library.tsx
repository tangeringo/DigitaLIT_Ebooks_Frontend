import { useState, useEffect } from 'react';
import { LibraryPageProps, CartItemInfo } from '../../globalTypes';
import { moreInfo, addToCart, closeButton, libraryRoute, defaultCartItemInfoState } from '../../variables';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { selectIsSideBarOpen, selectTargetBookItem } from '../../redux/library/librarySelectors';


import BookItemComponent from '../../components/book-item/bookItem.component';
import { ThemeProvider } from 'styled-components';
import { 
    ContainerWrapper, 
    BookItemsWrapperContainer, 
    SideBarSection, 
    NoMatchesText 
} from './library.styles';

import { setOpenSideBar } from '../../redux/library/libraryActions';
import SubmitButton, { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';

const LibraryPage = ({ theme, filteredBooks, setRoute }: LibraryPageProps) => {
    const dispatch = useDispatch();
    const selectedBook = useSelector(selectTargetBookItem);
    const isSideBarOpen = useSelector(selectIsSideBarOpen);
    const [cartItemInfo, setCartItemInfo] = useState<CartItemInfo>(defaultCartItemInfoState);

    const closeSideWrapperContainer = () => {
        setCartItemInfo(defaultCartItemInfoState);
        dispatch(setOpenSideBar(false));
    }


    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(libraryRoute);
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <ContainerWrapper>
                {filteredBooks.length?
                    <ContainerWrapper>

                        <BookItemsWrapperContainer isSideBarOpen={isSideBarOpen}>
                            {filteredBooks.map(item => (
                                <BookItemComponent 
                                    key={item.id} book={item} 
                                    buttonName={moreInfo} 
                                    cartItemInfo={cartItemInfo} 
                                    setCartItemInfo={setCartItemInfo}
                                />
                            ))}
                        </BookItemsWrapperContainer>

                        <SideBarSection showBook={cartItemInfo.showBook}>
                            <SubmitButton onClick={closeSideWrapperContainer} buttonType={BUTTON_TYPE_CLASS.close}>{closeButton}</SubmitButton>
                            <BookItemComponent book={selectedBook} buttonName={addToCart}/>
                        </SideBarSection>

                    </ContainerWrapper>
                    :<NoMatchesText>No book matches</NoMatchesText>
                }
            </ContainerWrapper>
        </ThemeProvider>
    );
}


export default LibraryPage;
