import styled from 'styled-components';
import { creme, darkBlue } from '../../styles/colors.styles';

interface OpenDropdownProps {
    openDropdown: boolean
}

export const UploadBaseBackgroundContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    transition: all .5s;
    display: flex;
`;

export const UploadedBackgroundWrapperOutline = styled.div`
    background-color: ${creme};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
    min-height: 40vh;
    margin: 30vh auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SquareWrapper = styled.div`
    background-color: ${creme};
    box-shadow: 0px 0px 26px ${(props) => props.theme.border};
`;

export const BottomScrollDownWrapper = styled.div.attrs((props) => (props.theme.cursive === darkBlue? {className: "bg-dark"} : {}))<OpenDropdownProps>`
    background: ${(props) => props.theme.cursive};
    box-shadow: 0px 0px 26px ${(props) => props.theme.border};
    border-radius: 12px;
    margin: 15px;
    width: 98%;
    transition: all .5s;
    height: ${({ openDropdown }) => openDropdown ? "490px": "0"};
    overflow: auto;
    margin: 0 auto;
`;

export const DescriptionLayout = styled.textarea`
    background: ${(props) => props.theme.background};
    resize: none;
    width: 100%;
    color: ${(props) => props.theme.textPrimary};
    height: 200px;
`;

export const InputLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeadlineTitle = styled.p`
    color: ${(props) => props.theme.textPrimary};
    margin-right: 10px;
`;

