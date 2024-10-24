import styled from "styled-components";
import { BaseBackgroundContainer } from "../../styles/styles.global";
import variables from "../../data/variables/variables.static.json";

export const MyBooksContainer = styled(BaseBackgroundContainer)`
    padding-top: 170px;
    flex-wrap: wrap;
    height: 100vh;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        height: 100%;
    }
`;