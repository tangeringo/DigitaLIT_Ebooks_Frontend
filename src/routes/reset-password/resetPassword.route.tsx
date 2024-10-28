import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { RouteProps } from '../../data/types/types.global';

import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import variables from '../../data/variables/variables.static.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import SubmitButton from '../../components/submit-button/submitButton.component';
import FormInput from '../../components/form-input/formInput.component';

import { ThemeProvider } from 'styled-components';
import { BaseBackgroundContainer } from '../../styles/styles.global';
import { 
    ResetPasswordCotntainer, 
    PageTitle, 
    ProgresBarStatusText, 
    ProgressBar 
} from './resetPassword.styles';


const ResetPasswordPage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const [formFields, setFormFields] = useState(variables.defaultStates.resetPassword);
    const { newPassword, confirmPassword } = formFields;
    const passwordStrength: string[] = ["weak", "medium", "good", "strong"];
    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(variables.defaultStates.resetPassword);
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
        setRoute("/reset-password");
    }, [dispatch, setRoute]);

    const getStrengthCounter = () => {
        if (newPassword.length <= 4) return 0;
        else if (newPassword.length <= 7 ) return 1;
        else if (newPassword.length <= 10 ) return 2;
        else return 3;
    }

    const strengthCounter = getStrengthCounter();

    return (
        <ThemeProvider theme={theme}>
            <BaseBackgroundContainer>
                <ResetPasswordCotntainer>
                    <FontAwesomeIcon icon={faLock} color={variables.colors.grey} size='3x' />
                    <PageTitle>Reset Password</PageTitle>

                    <form style={{width: "100%"}} onSubmit={handleSubmit}>
                        <FormInput type="password" name="newPassword" value={newPassword}
                            onChange={handleChange} label="New Password" required
                        />
                        <FormInput type="password" name="confirmPassword" value={confirmPassword}
                            onChange={handleChange} label="Confirm Password" required
                        />
                        {newPassword.length && confirmPassword.length && newPassword === confirmPassword?
                            <FontAwesomeIcon icon={faCheckSquare} color={variables.colors.green} size='2x' />
                            :null
                        }
                    </form>
                    <ProgresBarStatusText>strength: {passwordStrength[strengthCounter]}</ProgresBarStatusText>
                    <ProgressBar passwordlength={newPassword.length}></ProgressBar>
                    <SubmitButton onClick={() => {console.log("Reset Password")}}>Reset Password:</SubmitButton>
                </ResetPasswordCotntainer>
            </BaseBackgroundContainer>
        </ThemeProvider>
    );
}


export default ResetPasswordPage;
