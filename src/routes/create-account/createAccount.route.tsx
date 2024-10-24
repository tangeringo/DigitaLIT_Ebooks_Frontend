import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { LoginProps } from "../../data/types/types.global";
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { selectCurrentUserTokens } from '../../redux/user/user.selectors';
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

  
  const CreateAccountPage: React.FC<LoginProps> = ({ theme, setRoute, tokens, setTokens }) => {
    const [formFields, setFormFields] = useState(variables.defaultStates.createAccount);
    const { displayName, email, password, confirmPassword } = formFields;
    const currentUserTokens = useSelector(selectCurrentUserTokens);
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
      if (currentUserTokens?.access && currentUserTokens?.refresh) { navigate(variables.routes.home) }
    }, [currentUserTokens?.access, currentUserTokens?.refresh, navigate]);

    useEffect(() => {
      setTokens({ access: currentUserTokens?.access, refresh: currentUserTokens?.refresh });
    }, [currentUserTokens, setTokens]);


    useEffect(() => {
      dispatch(setIsCartOpen(false));
      setRoute(variables.routes.createAccount);
    }, [dispatch, setRoute]);
  
    return (
      <ThemeProvider theme={theme}>
        <AuthAppContainer>
            <LoginContainer>
                <Headding>{variables.appName}</Headding>
                <p>Create an account to get access to latest educational digital literature</p>
                <ComponentsContainer>
                    <form style={{width: "100%"}}>
                        <FormInput type="text" name="displayName" value={displayName}
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
                    <RedirectionLink to={variables.routes.login}>Login</RedirectionLink>
                </ComponentsContainer>
            </LoginContainer>
        </AuthAppContainer>
      </ThemeProvider>
    );
  }
  
  
  export default CreateAccountPage;