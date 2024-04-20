import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { RouteProps } from "../../globalTypes";
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

  
  const CreateAccountPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultCreateAccountFormFields);
    const { name, email, password, confirmPassword } = formFields;
  
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    }
  
    const resetFormFields = () => {
      setFormFields(defaultCreateAccountFormFields);
    }
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        // dispatch(emailSignInStart(email, password));
        resetFormFields();
  
      } catch(error) {
        return console.log('Error while creating the user, ', error)
      }
    }
  
    useEffect(() => {
      dispatch(setIsCartOpen(false));
      setRoute(createAccountRoute);
    }, [dispatch]);
  
    return (
      <ThemeProvider theme={theme}>
        <AuthAppContainer>
            <LoginContainer>
                <Headding>{appName}</Headding>
                <p>Create an account to get access to latest educational digital literature</p>
                <ComponentsContainer>
                    <form style={{width: "100%"}} onSubmit={handleSubmit}>
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
                        <SubmitButton onClick={() => console.log("create acc func")} buttonType={BUTTON_TYPE_CLASS.dropdown}>Create Account</SubmitButton>
                    </form>
                    <RedirectionLink to={loginRoute}>Login</RedirectionLink>
                </ComponentsContainer>
            </LoginContainer>
        </AuthAppContainer>
      </ThemeProvider>
    );
  }
  
  
  export default CreateAccountPage;