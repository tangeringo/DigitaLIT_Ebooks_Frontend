import React, { useState, useEffect, ChangeEvent } from 'react';
import { PasswordStrengthTypes, RouteProps } from '../../data/types/types.global';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import variables from '../../data/variables/variables.static.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import SubmitButton from '../../components/submit-button/submitButton.component';
import FormInput from '../../components/form-input/formInput.component';

import { ThemeProvider } from 'styled-components';
import { BaseBackgroundContainer } from '../../styles/styles.global';
import { passwordStrengthLevel } from './resetPassword.utils';
import { 
    ResetPasswordCotntainer, 
    PageTitle, 
    ProgresBarStatusText, 
    ProgressBar, 
    ProgressBarOutline
} from './resetPassword.styles';
import { resetPassword } from '../../requests/auth.request';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { updateAccessTokenSuccess } from '../../redux/user/user.actions';


const ResetPasswordPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthTypes>("weak");
    const [formFields, setFormFields] = useState(variables.defaultStates.resetPassword);
    const { newPassword, confirmPassword } = formFields;
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    const payload = {
        accessToken: currentUser?.accessToken,
        refreshToken: currentUser?.refreshToken, newPassword
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        setPasswordStrength(passwordStrengthLevel(newPassword));
    }

    const resetFormFields = () => {
        setFormFields(variables.defaultStates.resetPassword);
    }

    const onResetPasswordSubmit = async() => {
        if (!newPassword.length || !confirmPassword.length) return;
        else if (newPassword !== confirmPassword) return;
        try {
            const [accessToken, message] = await resetPassword(`/auth/reset-password`, payload);
            if (accessToken) { dispatch(updateAccessTokenSuccess(accessToken)); } // handled access token refresh for manual sign-in
            console.log(`message from server: ${message}`);
            resetFormFields();
        } catch(error) { console.log('Error while creating the user, ', error)}
    }

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute("/reset-password");
    }, [dispatch, setRoute]);


    return (
        <ThemeProvider theme={theme}>
            <BaseBackgroundContainer>
                <ResetPasswordCotntainer>
                    <FontAwesomeIcon icon={faLock} color={variables.colors.grey} size='3x' />
                    <PageTitle>Reset Password</PageTitle>

                    <form style={{width: "100%"}}>
                        <FormInput type="password" name="newPassword" value={newPassword}
                            eyeColor={theme.textPrimary} onChange={handleChange} label="New Password" required
                        />
                        <FormInput type="password" name="confirmPassword" value={confirmPassword}
                            eyeColor={theme.textPrimary} onChange={handleChange} label="Confirm Password" required
                        />
                        {newPassword.length && confirmPassword.length && newPassword === confirmPassword?
                            <FontAwesomeIcon icon={faCheckSquare} color={variables.colors.green} size='2x' />
                            :null
                        }
                    </form>
                    <ProgresBarStatusText>strength: {passwordStrength}</ProgresBarStatusText>
                    <ProgressBarOutline>
                        <ProgressBar strengthLevel={passwordStrength}></ProgressBar>
                    </ProgressBarOutline>
                    <SubmitButton onClick={onResetPasswordSubmit}>Reset Password:</SubmitButton>
                </ResetPasswordCotntainer>
            </BaseBackgroundContainer>
        </ThemeProvider>
    );
}


export default ResetPasswordPage;
