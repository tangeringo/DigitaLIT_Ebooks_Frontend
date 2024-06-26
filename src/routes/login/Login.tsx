import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { RouteProps, TokenType } from "../../globalTypes";
import { appName, createAccountRoute, loginRoute, resetPasswordRoute, defaultLoginFormFields, homeRoute } from '../../variables';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { facebookSignInStart, googleSignInStart, twitterSignInStart } from '../../redux/user/user.actions';
import { selectCurrentUserTokens } from '../../redux/user/user.selectors';
import { loginIntent } from '../../fetchUtils/login-intent';

import SubmitButton, { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';
import FormInput from '../../components/form-input/formInput.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ThemeProvider } from 'styled-components';
import { 
    AuthAppContainer, 
    LoginContainer, 
    Headding,
    ComponentsContainer,
    IconsContainer,
    Divider, OrText,
    BottomComponnetsContainer,
    RememberContainer,
    RememberCheckbox,
    RedirectionLink
} from './login.styles';
import { auth } from '../../firebase/firebase.utils';


const LoginPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(defaultLoginFormFields);
    const [tokens, setTokens] = useState<TokenType>({ access: undefined, refresh: undefined });
    const { email, password } = formFields;
    const currentUserTokens = useSelector(selectCurrentUserTokens);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signInWithFacebook = () => { dispatch(facebookSignInStart()) }
    const signInWithGoogle = () => { dispatch(googleSignInStart()) }
    const signInWithTwitter = () => { dispatch(twitterSignInStart()) }
    const resetFormFields = () => { setFormFields(defaultLoginFormFields) }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (email.length && password.length) {
            try {
                const tokens: TokenType = await loginIntent(`/auth/login`, {email, password});
                setTokens({access: tokens.access, refresh: tokens.refresh});
                resetFormFields();
            } catch(error) { throw new Error('Error while logging in') }
        } else return;
    }

    useEffect(() => {
        if (currentUserTokens?.access && currentUserTokens?.refresh) { navigate(homeRoute) }
    }, [currentUserTokens?.access, currentUserTokens?.refresh, navigate]);

    useEffect(() => {
        setTokens({ access: currentUserTokens?.access, refresh: currentUserTokens?.refresh });
    }, [currentUserTokens]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(loginRoute);
    }, [dispatch, setRoute]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            try {
                const newAccessToken = await user.getIdToken(true);
                setTokens((prevTokens) => ({ ...prevTokens, access: newAccessToken }));
            } catch (error) { throw new Error('Failed to refresh access token:') }
        });
    
        return () => unsubscribe();
      }, []);


    console.log("tokens: ", tokens);
    return (
        <ThemeProvider theme={theme}>
            <AuthAppContainer>
                <LoginContainer>
                    <Headding>{appName} Login</Headding>
                    <ComponentsContainer>
                        <IconsContainer>
                            <FontAwesomeIcon icon={faFacebook} size='2x' onClick={signInWithFacebook}/>
                            <FontAwesomeIcon icon={faGoogle} size='2x' onClick={signInWithGoogle}/>
                            <FontAwesomeIcon icon={faTwitter} size='2x' onClick={signInWithTwitter}/>
                        </IconsContainer>
                        <Divider><OrText>OR</OrText></Divider>
                        <form style={{width: "100%"}}>
                            <FormInput type="email" name="email" value={email} 
                                onChange={handleChange} label="Email" required
                            />
                            <FormInput type="password" name="password" value={password}
                                onChange={handleChange} label="Password" required
                            />
                            <SubmitButton onClick={handleSubmit} buttonType={BUTTON_TYPE_CLASS.dropdown}>Log In</SubmitButton>
                        </form>
                        <BottomComponnetsContainer>
                            <RememberContainer>
                                <RememberCheckbox id='checkbox' />
                                <label htmlFor='checkbox'><p style={{marginLeft: '7px'}}>Remember Me</p></label>
                            </RememberContainer>
                            <RedirectionLink to={resetPasswordRoute}><p>Reset password</p></RedirectionLink>
                        </BottomComponnetsContainer>
                        <RedirectionLink to={createAccountRoute}>Create Account</RedirectionLink>
                    </ComponentsContainer>
                </LoginContainer>
            </AuthAppContainer>
        </ThemeProvider>
    );
}

export default LoginPage;
