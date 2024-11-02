import styled, { css } from 'styled-components';

const shrinkLabelStyles = css`
  top: -20px;
  font-size: 12px;
`;

type FormInputLabelProps = {
  shrink?: boolean;
}

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: ${(props) => props.theme.textPrimary}; 
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 5px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles}
`;


export const Input = styled.input`
    padding: 8px;
    width: 100%;
    margin-bottom: 8px;  
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.background};
    color: ${props => props.theme.textPrimary};
    box-shadow: 0px 0px 4px ${(props) => props.theme.border};

    &:focus {
      outline: none;
    }

    &:focus ~ ${FormInputLabel} {
      ${shrinkLabelStyles};
    }
`;

export const Group = styled.div`
  position: relative;
  margin: 15px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const ToggleButton = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
`;
