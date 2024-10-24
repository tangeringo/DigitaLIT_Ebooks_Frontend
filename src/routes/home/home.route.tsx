import React, { useEffect } from "react";
import BooksBg1 from '../../assets/HomePage/BooksBg1.jpg';
import MyBooks1 from '../../assets/HomePage/myBooks1.jpg';

import { RouteProps } from "../../data/types/types.global";
import variables from "../../data/variables/variables.static.json";

import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';

import { ThemeProvider } from "styled-components";
import { CheckoutProductImage } from "../../components/checkout-item/checkoutItem.styles";
import { BaseBackgroundContainer } from "../../styles/styles.global";
import {
    HomeBaseContainer,
    SquareWrapper,
    ExplanationContainerWrapper,
    DescriptionLabelContainer,
    TitleHeadding,
    ExplanationParagraph,
    RedirectionLinkText
} from "./home.styles";


const HomePage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.home);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <BaseBackgroundContainer>
                <HomeBaseContainer>
                    <SquareWrapper>
                        <TitleHeadding>Dive into digital learning with ease</TitleHeadding>
                        <ExplanationParagraph>
                            Your go-to spot for essential college literature, catering to your academic journey with textbooks and references.
                        </ExplanationParagraph>
                        <ExplanationParagraph>
                        <strong>What's in there for you?</strong>
                            <ul style={{marginTop: "15px"}}>
                                <li>You can find the same books for up to 50% less.</li>
                                <li>Make learning fun by highlighting areas and making changes.</li>
                                <li>Save space in your desk drawers by deleting the book once you're finished.</li>
                            </ul>
                        </ExplanationParagraph>
                    </SquareWrapper>
                    <div >
                        <ExplanationContainerWrapper>
                            <CheckoutProductImage src={BooksBg1}/>
                            <DescriptionLabelContainer>
                                <TitleHeadding>Library</TitleHeadding>
                                <ExplanationParagraph>
                                    You can search for the book you're looking for in our database on the 
                                    <strong><RedirectionLinkText to={variables.routes.library}>library</RedirectionLinkText></strong> page.
                                </ExplanationParagraph>
                            </DescriptionLabelContainer>
                        </ExplanationContainerWrapper>

                        <ExplanationContainerWrapper>
                            <DescriptionLabelContainer>
                                <TitleHeadding>My Books</TitleHeadding>
                                <ExplanationParagraph>
                                    Once you found and purchased the book you can now see it on the
                                    <strong><RedirectionLinkText to={variables.routes.myBooks}>my books</RedirectionLinkText></strong> page.
                                    <p>Click on it to render the pdf version!</p>
                                </ExplanationParagraph>
                            </DescriptionLabelContainer>
                            <CheckoutProductImage src={MyBooks1}/>
                        </ExplanationContainerWrapper>
                    </div>
                </HomeBaseContainer>
            </BaseBackgroundContainer>
        </ThemeProvider>
    );
}

export default HomePage;