import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { RouteProps, TokenType } from "../../globalTypes";
import { appName, createAccountRoute, loginRoute, defaultCreateAccountFormFields } from '../../variables';

import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';

import SubmitButton, { BUTTON_TYPE_CLASS } from '../../components/submit-button/submitButton.component';
import FormInput from '../../components/form-input/formInput.component';

import { ThemeProvider } from 'styled-components';
import { 
    AuthAppContainer, 
    LoginContainer, 
    Headding,
    ComponentsContainer,
    RedirectionLink
} from '../login/login.styles';
import { loginIntentAxios } from '../../fetchUtils/login.intent';

  
  const CreateAccountPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(defaultCreateAccountFormFields);
    const [tokens, setTokens] = useState({ access: "", refresh: "" });
    const { name, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    }
  
    const resetFormFields = () => {
      setFormFields(defaultCreateAccountFormFields);
    }

      const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (email.length && password.length) {
          try {
            const tokens: TokenType = await loginIntentAxios(`auth/register`, {name, email, password});
            setTokens({access: tokens.access, refresh: tokens.refresh})
            // dispatch(emailSignInStart(email, password));
            // also set the user to loginPayload
            resetFormFields();
  
          } catch(error) {
              return console.log('Error while creating the user, ', error)
          }
        }
      else return;
    }
  
    useEffect(() => {
      dispatch(setIsCartOpen(false));
      setRoute(createAccountRoute);
    }, [dispatch, setRoute]);
  
    return (
      <ThemeProvider theme={theme}>
        <AuthAppContainer>
            <LoginContainer>
                <Headding>{appName}</Headding>
                <p>Create an account to get access to latest educational digital literature</p>
                <ComponentsContainer>
                    <form style={{width: "100%"}}>
                        <FormInput type="text" name="name" value={name}
                            onChange={handleChange} label="Name" required
                        />
                        <FormInput type="email" name="email" value={email}
                            onChange={handleChange} label="Email" required
                        />
                        <FormInput type="password" name="password" value={password}
                            onChange={handleChange} label="Password" required
                        />
                        <FormInput type="password" name="confirmPassword" value={confirmPassword}
                            onChange={handleChange} label="Confirm Password" required
                        />
                        <SubmitButton onClick={handleSubmit} buttonType={BUTTON_TYPE_CLASS.dropdown}>Create Account</SubmitButton>
                    </form>
                    <RedirectionLink to={loginRoute}>Login</RedirectionLink>
                </ComponentsContainer>
            </LoginContainer>
        </AuthAppContainer>
      </ThemeProvider>
    );
  }
  
  
  export default CreateAccountPage;