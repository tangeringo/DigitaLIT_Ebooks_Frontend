import { useDispatch, useSelector } from 'react-redux';
import { CheckouComponnetProps } from '../../globalTypes';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../redux/cart/cartActions';
import { selectCartItems } from '../../redux/cart/cartSelectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { creme } from '../../styles/colors.styles';
import { 
    SectionWrapperUnderline,
    SectionWeapper, 
    CheckoutProductImage, 
    DescriptionWrapperContainer,
    WrapperContainer,
    ProductLabel,
    ProductItemTitle,
    ProductItemPrice,
    BottomLinkLabel,
} from './checkoutItem.styles';



const CheckoutItemComponent: React.FC<CheckouComponnetProps> = ({ cartItem }) => {
    const { imgSource, name, price, quantity, description } = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem));
    
    return (
        <SectionWrapperUnderline>
            <SectionWeapper>
                <CheckoutProductImage src={imgSource} />
                    <DescriptionWrapperContainer>
                        <WrapperContainer>
                            <ProductItemTitle>{name}</ProductItemTitle>
                            <ProductLabel>{description}</ProductLabel>
                            <div>
                                <BottomLinkLabel onClick={clearItem}>Delete</BottomLinkLabel>
                                <FontAwesomeIcon onClick={addItem} icon={faPlus} color={creme} size='1x' style={{marginLeft: "7px"}}/>
                                <ProductLabel>Quantity: {quantity}</ProductLabel>
                                <FontAwesomeIcon onClick={removeItem} icon={faMinus} color={creme} size='1x' style={{marginLeft: "7px"}}/>
                            </div>
                        </WrapperContainer>
                        <ProductItemPrice>${price}</ProductItemPrice>
                    </DescriptionWrapperContainer>
            </SectionWeapper>
        </SectionWrapperUnderline>
    );
}

export default CheckoutItemComponent;