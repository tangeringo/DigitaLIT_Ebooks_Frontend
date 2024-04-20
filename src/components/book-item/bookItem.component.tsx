import { useNavigate } from 'react-router-dom';
import { addToCart, editPdfRoute, moreInfo, showBook } from '../../variables';

import { MyBookProps } from '../../globalTypes';

import { useDispatch, useSelector } from 'react-redux';
import { BookItem } from '../../redux/library/libraryTypes';
import { setOpenSideBar, setSelectedBookItem } from '../../redux/library/libraryActions';
import { addItemToCart, setCartIconPulse } from '../../redux/cart/cartActions';
import { selectCartItems } from '../../redux/cart/cartSelectors';

import { 
    CollectionItem, 
    BookImage, 
    CartItemButton, 
    ButtonTitle,
    ItemDescription, 
    BookTitle, 
    BookPrice, 
    BookDescription 
} from './bookItem.styles';


const BookItemComponent = ({ book, buttonName, cartItemInfo, setCartItemInfo }: MyBookProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, imgSource, name, price, description } = book;
    const cartItems = useSelector(selectCartItems);

    const buttonIconOnClick = (book: BookItem): void => {
        // if (buttonName === showBook) navigate(displayBookInfoRoute);
        if (buttonName === showBook) navigate(editPdfRoute);
        else if (buttonName === addToCart) {
            dispatch(setCartIconPulse(true));
            dispatch(addItemToCart(cartItems, book));


        } else if (buttonName === moreInfo && setCartItemInfo)
            if ((!cartItemInfo?.showBook) || (cartItemInfo?.id !== id)) {
                dispatch(setSelectedBookItem(book));
                setCartItemInfo({ id: id, showBook: true });
                dispatch(setOpenSideBar(true));
            } else { 
                setCartItemInfo({ id: id, showBook: false });
                dispatch(setOpenSideBar(false));
            }
    }

    return (
        <CollectionItem buttonName={buttonName}>
            <BookImage src={imgSource}></BookImage>

            <ItemDescription buttonTitle={buttonName}>
                <span>name: <BookTitle>{name}</BookTitle></span>
                { buttonName !== showBook? <BookPrice> ${price} </BookPrice> :null }
            </ItemDescription>

            {buttonName === addToCart?
                <ItemDescription buttonTitle={addToCart}>
                    <span>description: <BookDescription>{description} </BookDescription></span>
                </ItemDescription> 
                :null
            }
            
            <CartItemButton buttonName={buttonName} onClick={() => buttonIconOnClick(book)}>
                <ButtonTitle buttonName={buttonName}>{buttonName}</ButtonTitle>
            </CartItemButton>
        </CollectionItem>
    );
}

export default BookItemComponent;