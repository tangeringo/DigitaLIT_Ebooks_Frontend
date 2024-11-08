import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { RouteProps } from "../../data/types/types.global";
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { signUpStart } from '../../redux/user/user.actions';

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

  
  const RegisterPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(variables.defaultStates.createAccount);
    const { displayName, email, password, confirmPassword } = formFields;
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    }
  
    const resetFormFields = () => {
      setFormFields(variables.defaultStates.createAccount);
    }

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      if (email.length && password.length) {
        try {
          dispatch(signUpStart(email, password, displayName));
          resetFormFields();
        } catch(error) { throw new Error('Error while creating user') }
      } else return;
    }

    useEffect(() => {
      if (currentUser?.accessToken && currentUser?.refreshToken) { navigate(variables.routes.home) }
    }, [currentUser, navigate]);


    useEffect(() => {
      dispatch(setIsCartOpen(false));
      setRoute(variables.routes.register);
    }, [dispatch, setRoute]);
  
    return (
      <ThemeProvider theme={theme}>
        <AuthAppContainer>
            <LoginContainer>
                <Headding>{variables.appName}</Headding>
                <p>Create an account to get accessToken to latest educational digital literature</p>
                <ComponentsContainer>
                    <form style={{width: "100%"}}>
                        <FormInput type="text" name="displayName" value={displayName}
                          onChange={handleChange} label="Name" required
                        />
                        <FormInput type="email" name="email" value={email}
                          onChange={handleChange} label="Email" required
                        />
                        <FormInput type="password" name="password" value={password}
                          eyeColor={theme.textPrimary} onChange={handleChange} label="Password" required
                        />
                        <FormInput type="password" name="confirmPassword" value={confirmPassword}
                          eyeColor={theme.textPrimary} onChange={handleChange} label="Confirm Password" required
                        />
                        <SubmitButton onClick={handleSubmit} buttonType={BUTTON_TYPE_CLASS.dropdown}>Register</SubmitButton>
                    </form>
                    <RedirectionLink to={variables.routes.login}>Login</RedirectionLink>
                </ComponentsContainer>
            </LoginContainer>
        </AuthAppContainer>
      </ThemeProvider>
    );
  }
  
  
  export default RegisterPage;