import styled from "styled-components";
import { BaseBackgroundContainer } from "../../styles/globalStyles.styles";
import { mediaPixelsWidth1200 } from "../../variables";

export const MyBooksContainer = styled(BaseBackgroundContainer)`
    padding-top: 170px;
    flex-wrap: wrap;
    height: 100vh;

    @media (max-width: ${mediaPixelsWidth1200}) {
        height: 100%;
    }
`;