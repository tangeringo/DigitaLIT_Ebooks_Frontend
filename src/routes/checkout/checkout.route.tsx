import React, { useEffect, useState } from 'react';
import { RouteProps } from '../../data/types/types.global';
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItemComponent from '../../components/checkout-item/checkoutItem.component';

import SubmitButton from '../../components/submit-button/submitButton.component';
import { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';

import { processPayment } from '../../requests/payment.request';
import CheckoutCard from '../../components/checkout-card/checkoutCard.component';

import { ThemeProvider } from 'styled-components';
import { 
    CheckoutContainer, 
    CheckoutItemsWrapper, 
    BottomComponentsContainer,
    TotalCountWrapper, Total, 
    CheckoutBackground 
} from './checkout.styles';
import { updateAccessTokenStart, updateAccessTokenSuccess } from '../../redux/user/user.actions';


const CheckoutPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [secret, setSecret] = useState<unknown>(null);
    const [secretCalled, setSecredCalled] = useState<boolean>(false);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const payload = {
        id: currentUser?.id,
        accessToken: currentUser?.accessToken,
        refreshToken: currentUser?.refreshToken, 
        amount: cartTotal * 100
    }

    useEffect(() => {
        (navbarToggler as HTMLElement)?.click();
      }, [navbarToggler]);

    useEffect(() => {
        if (!currentUser?.accessToken && !currentUser?.refreshToken) { navigate(variables.routes.login) }
    }, [currentUser?.accessToken, currentUser?.refreshToken, navigate]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.checkout);
    }, [dispatch, setRoute]);

    const onCheckoutSubmit = async() => {
        if (secretCalled) return;
        else try {
            const [accessToken, clientSecret] = await processPayment(`/stripe/secret`, payload);
            if (currentUser?.id) { dispatch(updateAccessTokenStart()); }  // handled access token refresh for Facebook, Google, Twitter
            if (accessToken) { dispatch(updateAccessTokenSuccess(accessToken)); } // handled access token refresh for manual sign-in
            setSecret(clientSecret);
            setSecredCalled(true);
        } catch (error) { throw new Error("Failed to connect to stripe.") }
    };

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