import { FC, ButtonHTMLAttributes } from 'react';

import { 
    BaseButtonStyles,
    CheckoutButtonStyles,
    DropdownButtonStyles,
    CloseButtonStyles,
    ButtonSpinner 
} from './submitButton.styles.';

export enum BUTTON_TYPE_CLASS {
    base = "base-submit",
    checkout = "checkout-submit",
    dropdown = "dropdown-submit",
    close = "close-submit"
}

const getButtonStyles = (buttonType = BUTTON_TYPE_CLASS.base): typeof BaseButtonStyles => 
    ({
        [BUTTON_TYPE_CLASS.base]: BaseButtonStyles,
        [BUTTON_TYPE_CLASS.checkout]: CheckoutButtonStyles,
        [BUTTON_TYPE_CLASS.dropdown]: DropdownButtonStyles,
        [BUTTON_TYPE_CLASS.close]: CloseButtonStyles,
    }[buttonType]);

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASS;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

const SubmitButton: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
    const CustomButton = getButtonStyles(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading? <ButtonSpinner /> : children}
        </CustomButton>
    );
};

export default SubmitButton;