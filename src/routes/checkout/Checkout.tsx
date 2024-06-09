import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../globalTypes';
import { checkoutRoute } from '../../variables';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cartSelectors';

import CheckoutItemComponent from '../../components/checkout-item/checkoutItem.component';

import SubmitButton from '../../components/submit-button/submitButton.component';
import { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';

import { paymentIntent } from '../../fetchUtils/payment-intent-utils';
import CheckoutCard from '../../components/checkout-card/checkoutCard.component';

import { ThemeProvider } from 'styled-components';
import { 
    CheckoutContainer, 
    CheckoutItemsWrapper, 
    BottomComponentsContainer,
    TotalCountWrapper, Total, 
    CheckoutBackground 
} from './checkout.styles';
import axios from 'axios';          // DEVELOPMENT



const CheckoutPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [secret, setSecret] = useState<unknown>(null);
    const [secretCalled, setSecredCalled] = useState<boolean>(false);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();


    const onCheckoutSubmit = async() => {
        if (secretCalled) return;
        else try {
            const clientSecret: unknown = await paymentIntent(`/stripe/secret`, cartTotal);
            // const res = await axios.post(`http://localhost:8000/api/stripe/secret`, { amount: cartTotal * 100 })      // DEVELOPMENT
            // const { client_secret: clientSecret } = await res.data;                                                   // DEVELOPMENT
            setSecret(clientSecret);
            setSecredCalled(true);
        } catch (error) {
            alert("An error has occurred; try again later!")
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
                        <TotalCountWrapper>
                            <Total>Total: ${cartTotal}</Total>
                        </TotalCountWrapper>
                        <SubmitButton onClick={onCheckoutSubmit} buttonType={BUTTON_TYPE_CLASS.checkout}>Proceed to Transaction</SubmitButton>
                    </BottomComponentsContainer>
                    { !secret? null : <CheckoutCard theme={theme} secret={secret} /> }
                </CheckoutContainer>
            </CheckoutBackground>
        </ThemeProvider>
    );
}

export default CheckoutPage;