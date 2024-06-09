import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { RouteProps, TokenType } from "../../globalTypes";
import { appName, createAccountRoute, loginRoute, resetPasswordRoute, defaultLoginFormFields } from '../../variables';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';
import { loginIntent } from '../../fetchUtils/login-intent';
import axios from 'axios';            // DEVELOPMENT
import { auth, facebook, login } from '../../firebase'

import SubmitButton, { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';
import FormInput from '../../components/form-input/formInput.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';

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
    const [formFields, setFormFields] = useState(defaultLoginFormFields);
    const [tokens, setTokens] = useState({ access: "", refresh: "" });
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultLoginFormFields);
    }

    const handleLoginWithFacebook = async() => { 
        try {
            const user = await login(auth, facebook);
            if (user) {
                console.log("User Logged In from Facebook: ", user);
            } else {
                console.log("Logging in from Facebook FAILED ");
            }   
        } catch (error) {
            console.log("error while logging into FIREBASE facebook authentication")
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (email.length && password.length) {
            try {
                const tokens: TokenType = await loginIntent(`/auth/login`, {email, password});
                // const res = await axios.post(`http://localhost:8000/users/auth/login`, { email, password });        // DEVELOPMENT
                // const { tokens } = await res.data;                                                                // DEVELOPMENT
                setTokens({access: tokens.access, refresh: tokens.refresh})
                // also set the user to loginPayload
                // dispatch(emailSignInStart(email, password));
                resetFormFields();
            } catch(error) { alert('Error while logging in; try again later!') }
        }
        else return;
    }

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(loginRoute);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <AuthAppContainer>
                <LoginContainer>
                    <Headding>{appName} Login</Headding>
                    <ComponentsContainer>
                        <IconsContainer>
                            <FontAwesomeIcon icon={faFacebook} size='2x' onClick={handleLoginWithFacebook}/>  {/* onClick={handleLoginWithFacebook} */}
                            <FontAwesomeIcon icon={faGoogle} size='2x' />
                            <FontAwesomeIcon icon={faInstagram} size='2x' />
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
                    <RedirectionLink to={createAccountRoute} >Create Account</RedirectionLink>
                    </ComponentsContainer>
                </LoginContainer>
            </AuthAppContainer>
        </ThemeProvider>
    );
}

export default LoginPage;
