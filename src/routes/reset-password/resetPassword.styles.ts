import styled, { css, RuleSet } from "styled-components";
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
    margin-top: 20px;
`;


const progressBar25Percent = css`
    background-color: ${variables.colors.red};
    width: 25%;
`;

const progressBar50Percent = css`
    background-color: ${variables.colors.orange};
    width: 50%;
`;

const progressBar75Percent = css`
    background-color: ${variables.colors.yellow};
    width: 75%;
`;

const progressBar100Percent = css`
    background-color: ${variables.colors.green};
    width: 100%;
`;

type passwordLengthProps = {
    strengthLevel: string;
}

const getProgressBarStyles = ({strengthLevel}: passwordLengthProps): RuleSet<object> => {
    if (strengthLevel === variables.passwordStrength.strong) 
        return progressBar100Percent;
    else if (strengthLevel === variables.passwordStrength.medium ) 
        return progressBar75Percent;
    else if (strengthLevel === variables.passwordStrength.good ) 
        return progressBar50Percent;
    else return progressBar25Percent;
}

export const ProgressBarOutline = styled.div`
    border: 2px solid ${props => props.theme.textPrimary};
    height: 25px;
    width: 100%;
    border-radius: 15px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    
`;

export const ProgressBar = styled.div<passwordLengthProps>`
    height: 17px;
    border-radius: 15px;
    margin: 0 2.5px;

    ${(props) => getProgressBarStyles(props)};
`;
