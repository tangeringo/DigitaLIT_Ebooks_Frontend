import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { RouteProps } from "../../data/types/types.global";
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { setRememberMe } from '../../redux/auth/auth.actions';
import { emailAndPasswordSignInStart, facebookSignInStart, googleSignInStart, twitterSignInStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectRememberMe } from '../../redux/auth/auth.selectors';

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


const LoginPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(variables.defaultStates.loginForm);
    const { email, password } = formFields;
    const currentUser = useSelector(selectCurrentUser);
    const rememberMe = useSelector(selectRememberMe);
    const toggle = () => dispatch(setRememberMe(!rememberMe));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signInWithFacebook = () => { dispatch(facebookSignInStart()) }
    const signInWithGoogle = () => { dispatch(googleSignInStart()) }
    const signInWithTwitter = () => { dispatch(twitterSignInStart()) }
    const resetFormFields = () => { setFormFields(variables.defaultStates.loginForm) }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (email.length && password.length) {
            try {
                dispatch(emailAndPasswordSignInStart(email, password));
                resetFormFields();
            } catch(error) { throw new Error('Error while logging in') }
        } else return;
    }

    useEffect(() => {
        if (currentUser?.accessToken && currentUser?.refreshToken) { navigate(variables.routes.home) }
    }, [currentUser, navigate]);

    // useEffect(() => {
    //     setTokens({ accessToken: currentUser?.accessToken, refreshToken: currentUser?.refreshToken });
    // }, [currentUser, setTokens]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.login);
    }, [dispatch, setRoute]);
    
    return (
        <ThemeProvider theme={theme}>
            <AuthAppContainer>
                <LoginContainer>
                    <Headding>{variables.appName} Login</Headding>
                    <ComponentsContainer>
                        <IconsContainer>
                            <FontAwesomeIcon style={{cursor: "pointer"}} icon={faFacebook} size='2x' onClick={signInWithFacebook}/>
                            <FontAwesomeIcon style={{cursor: "pointer"}} icon={faGoogle} size='2x' onClick={signInWithGoogle}/>
                            <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTwitter} size='2x' onClick={signInWithTwitter}/>
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
                                <RememberCheckbox id='checkbox' onClick={toggle} checked={rememberMe}/>
                                <label htmlFor='checkbox'><p style={{marginLeft: '7px'}}>Remember Me</p></label>
                            </RememberContainer>
                            <RedirectionLink to={variables.routes.resetPassword}><p>Reset password</p></RedirectionLink>
                        </BottomComponnetsContainer>
                        <RedirectionLink to={variables.routes.register}>Register</RedirectionLink>
                    </ComponentsContainer>
                </LoginContainer>
            </AuthAppContainer>
        </ThemeProvider>
    );
}

export default LoginPage;
