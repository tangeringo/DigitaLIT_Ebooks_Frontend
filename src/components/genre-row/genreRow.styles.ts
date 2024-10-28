import styled from "styled-components";
import variables from "../../data/variables/variables.static.json";

export const GenreOutlineWrapper = styled.div`
    border-top: 2px solid ${variables.colors.darkWhite};
    // border-bottom: 2px solid ${variables.colors.darkWhite};
    margin: 50px auto;
    width: 95%;
`;

export const BooksWraper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    width: 100%;
    padding: 0 20px;
`;

export const Genre = styled.h3`
    font-family: monospace;
    margin-left: 25px;
    color: ${(props) => props.theme.border};
`;

export const BookCounter = styled.p`
    color: ${(props) => props.theme.border};
    margin-left: 25px;
`;