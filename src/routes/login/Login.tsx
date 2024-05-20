import React, { useState, useEffect, ChangeEvent } from 'react';

import { RouteProps } from "../../globalTypes";
import { appName, createAccountRoute, loginRoute, resetPasswordRoute, defaultLoginFormFields, serverHost } from '../../variables';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';

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
import { loginIntent } from '../../fetchUtils/login.intent';



const LoginPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(defaultLoginFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultLoginFormFields);
    }

    const handleSubmit = async () => {
        if (email.length && password.length) {
            try {
                const tokens = await loginIntent(`${serverHost}/login`, {email, password});
                console.log("tokens111: ", tokens);
                // also set the user to loginPayload
                // dispatch(emailSignInStart(email, password));
                resetFormFields();
    
            } catch(error) {
                return console.log('Error while creating the user, ', error)
            }
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
                            <FontAwesomeIcon icon={faFacebook} size='2x' />
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
