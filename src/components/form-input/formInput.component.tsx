import { InputHTMLAttributes, FC, useState } from 'react';
import { FormInputLabel, Input, Group, ToggleButton } from './formInput.styles';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type FormInputProps = { label: string, type: string, eyeColor?: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, type, eyeColor, ...otherProps }) => {
    const [show, setShow] = useState<boolean>(false);
    const inputType = type === 'password' && show ? 'text' : type;
    return (
        <Group>
            <Input type={inputType} {...otherProps} />
            {label && (
            <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' &&  otherProps.value.length)}>
                {label}
            </FormInputLabel>
            )}
            
            {type === 'password' && (
                <ToggleButton onClick={() => setShow(!show)} type="button">
                    <FontAwesomeIcon style={{color: eyeColor, cursor: "pointer", width: 30, height: 15, marginBottom: 5}} icon={show? faEyeSlash : faEye} size='1x' />
                </ToggleButton>
            )}
        </Group>
    )
}

export default FormInput;