import styled, { css, RuleSet } from "styled-components";
import { red, orange, yellow, green } from "../../styles/styles.colrs";
import variables from "../../data/variables/variables.static.json";


export const ResetPasswordCotntainer = styled.div`
    margin: 150px auto;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 1.5rem;
    width: 400px;
    height: 640px;
    box-shadow: 0px 0px 12px ${props => props.theme.border};
    border-radius: 8px;
    background-color: ${props => props.theme.background};
    border: none; 
    
    @media (max-width: ${variables.mediaPixels.width600}) {
        width: 70%;
    }
`;

export const PageTitle = styled.h1`
    color: ${props => props.theme.textPrimary};
    margin: 0 auto 15vh;
`;
       
export const ProgresBarStatusText = styled.p`
color: ${props => props.theme.textPrimary};
    margin: 20px auto 10px 0;
`;


const progressBar25percent = css`
    background-color: ${red};
    width: 25%;
`;

const progressBar50percent = css`
    background-color: ${orange};
    width: 50%;
`;

const progressBar75percent = css`
    background-color: ${yellow};
    width: 75%;
`;

const progressBar100percent = css`
    background-color: ${green};
    width: 100%;
`;

type passwordLengthProps = {
    passwordlength: number;
}

const getProgressBarStyles = ({ passwordlength }: passwordLengthProps): RuleSet<object> => {
    if (passwordlength <= 4) return progressBar25percent;
    else if (passwordlength <= 7 ) return progressBar50percent;
    else if (passwordlength <= 10 ) return progressBar75percent;
    else return progressBar100percent;
}


export const ProgressBar = styled.div<passwordLengthProps>`
    height: 10px;
    margin: 0 auto 40px 0;

    ${(props) => getProgressBarStyles(props)};
`;
