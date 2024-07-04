import styled from 'styled-components';
import { darkBlue } from '../../styles/colors.styles';

interface OpenDropdownProps {
    openDropdown: boolean
}

export const BottomScrollDownWrapper = styled.div.attrs((props) => (props.theme.cursive === darkBlue? {className: "bg-dark"} : {}))<OpenDropdownProps>`
    background: ${(props) => props.theme.cursive};
    margin: 15px;
    width: 700px;
    transition: all .5s;
    height: ${({ openDropdown }) => openDropdown ? "490px": "0"};
    overflow: auto;
    margin: 0 auto;
`;

export const DescriptionLayout = styled.textarea`
    background: ${(props) => props.theme.background};
    resize: none;
    width: 545px;
    color: ${(props) => props.theme.textPrimary};
    height: 200px;
`;

export const HeadlineTitle = styled.p`
    color: ${(props) => props.theme.textPrimary};
    margin-right: 10px;
`;

