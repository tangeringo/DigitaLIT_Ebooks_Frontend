import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../globalTypes';
import { checkoutRoute } from '../../variables';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSelectors';

import CheckoutItemComponent from '../../components/checkout-item/checkoutItem.component';

import SubmitButton from '../../components/submit-button/submitButton.component';
import { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';

import { paymentIntent } from '../../stripe/payment-intent-utils';
import CheckoutCard from '../../components/checkout-card/checkoutCard.component';

import { ThemeProvider } from 'styled-components';
import { 
    CheckoutContainer, 
    CheckoutItemsWrapper, 
    BottomComponentsContainer,
    TotalCountWrapper, Total, 
    CheckoutBackground 
} from './checkout.styles';



const CheckoutPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [secret, setSecret] = useState<unknown>(null);
    const [secretCalled, setSecredCalled] = useState<boolean>(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const onCheckoutSubmit = async() => {
        if (secretCalled) return;
        else try {
            const clientSecret: unknown = await paymentIntent('http://127.0.0.1:8000/secret', cartTotal)
            setSecret(clientSecret);
            setSecredCalled(true);
        } catch (error) {
            alert('An error has occurred; try again later!')
        }
    };

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(checkoutRoute);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <CheckoutBackground secret={secret}>
                <CheckoutContainer>
                   <CheckoutItemsWrapper>
                        { cartItems.map(cartItem => (<CheckoutItemComponent key={cartItem.id} cartItem={cartItem}/> ))}
                    </CheckoutItemsWrapper>


                    <BottomComponentsContainer>
                        <SubmitButton onClick={onCheckoutSubmit} buttonType={BUTTON_TYPE_CLASS.checkout}>Proceed to Transaction</SubmitButton>
                        <TotalCountWrapper>
                            <Total>Total: ${cartTotal}</Total>
                        </TotalCountWrapper>
                    </BottomComponentsContainer>
                    { !secret? null : <CheckoutCard theme={theme} secret={secret} /> }
                </CheckoutContainer>
            </CheckoutBackground>
        </ThemeProvider>
    );
}

export default CheckoutPage;