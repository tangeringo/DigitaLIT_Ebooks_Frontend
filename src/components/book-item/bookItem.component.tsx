import { useNavigate } from 'react-router-dom';
import { addToCart, moreInfo, showBook, editPdfRoute } from '../../variables';

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


const BookItemComponent = ({ book, buttonName, cartItemInfo, setCartItemInfo }: MyBookProps): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id, imgSource, name, price, copyright, description } = book;
    const cartItems = useSelector(selectCartItems);

    const buttonIconOnClick = (book: BookItem): void => {
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

            {buttonName === addToCart?
                <div style={{width: "100%"}}>
                    <ItemDescription buttonTitle={buttonName}>
                        <BookTitle>{name}</BookTitle>
                    </ItemDescription>
                    <BookImage src={imgSource}></BookImage>
                    <div style={{width: "100%"}}>
                        <ItemDescription buttonTitle={addToCart}>
                            <span>copyright info: <BookDescription>{copyright} </BookDescription></span>
                        </ItemDescription> 
                        <ItemDescription buttonTitle={addToCart}>
                            <span>description: <BookDescription>{description} </BookDescription></span>
                        </ItemDescription> 
                    </div>
                </div>
                
                :<div style={{width: "100%"}}>
                    <BookImage src={imgSource}></BookImage>
                    <ItemDescription buttonTitle={buttonName}>
                        <span>name: <BookTitle>{name}</BookTitle></span>
                        { buttonName !== showBook? <BookPrice> ${price} </BookPrice> :null }
                    </ItemDescription>
                </div>
            }
            
            <CartItemButton buttonName={buttonName} onClick={() => buttonIconOnClick(book)}>
                <ButtonTitle buttonName={buttonName}>{buttonName}</ButtonTitle>
            </CartItemButton>
        </CollectionItem>
    );
}

export default BookItemComponent;