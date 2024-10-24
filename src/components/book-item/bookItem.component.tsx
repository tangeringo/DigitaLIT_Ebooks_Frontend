import { useNavigate } from 'react-router-dom';
import variables from '../../data/variables/variables.static.json';
import { bookImages, BookImageKeys } from '../../assets/books/_images';

import { MyBookProps } from '../../data/types/types.global';

import { useDispatch, useSelector } from 'react-redux';
import { BookItem } from '../../redux/library/library.types';
import { setOpenSideBar, setSelectedBookItem } from '../../redux/library/library.actions';
import { addItemToCart, setCartIconPulse } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';

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

    const { id, img, name, price, copyright, description } = book;
    const imgPath = bookImages[img as BookImageKeys] ?? "";

    const cartItems = useSelector(selectCartItems);

    const buttonIconOnClick = (book: BookItem): void => {
        if (buttonName === variables.buttons.showBook) navigate(variables.routes.editPdf);
        else if (buttonName === variables.buttons.addToCart) {
            dispatch(setCartIconPulse(true));
            dispatch(addItemToCart(cartItems, book));
        } else if (buttonName === variables.buttons.moreInfo && setCartItemInfo)
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

            {buttonName === variables.buttons.addToCart?
                <div style={{width: "100%"}}>
                    <ItemDescription buttonTitle={buttonName}>
                        <BookTitle>{name}</BookTitle>
                    </ItemDescription>
                    <BookImage src={imgPath}></BookImage>
                    <div style={{width: "100%"}}>
                        <ItemDescription buttonTitle={variables.buttons.addToCart}>
                            <span>copyright info: <BookDescription>{copyright} </BookDescription></span>
                        </ItemDescription> 
                        <ItemDescription buttonTitle={variables.buttons.addToCart}>
                            <span>description: <BookDescription>{description} </BookDescription></span>
                        </ItemDescription> 
                    </div>
                </div>
                
                :<div style={{width: "100%"}}>
                    <BookImage src={imgPath}></BookImage>
                    <ItemDescription buttonTitle={buttonName}>
                        <span>name: <BookTitle>{name}</BookTitle></span>
                        { buttonName !== variables.buttons.showBook? <BookPrice> ${price} </BookPrice> :null }
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