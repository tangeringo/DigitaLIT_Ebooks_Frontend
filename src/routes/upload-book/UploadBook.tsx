import { ChangeEvent, useEffect, useState } from 'react';
import { RouteProps } from '../../globalTypes';
import { defaultUploadFormFields, dropdownScroll, scrollDown, scrollUp, uploadBookRoute } from '../../variables';

import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cartActions';

import FormInput from '../../components/form-input/formInput.component';
import SubmitButton from '../../components/submit-button/submitButton.component';

import { ThemeProvider } from 'styled-components';
import { ButtonTitle, CartItemButton } from '../../components/book-item/bookItem.styles';
import { 
    ExplanationParagraph, 
    TitleHeadding 
} from '../home/home.styles';
import { 
    UploadBaseBackgroundContainer,
    UploadedBackgroundWrapperOutline,
    SquareWrapper,
    BottomScrollDownWrapper, 
    DescriptionLayout, 
    HeadlineTitle,
    InputLabelWrapper
} from './uploadedBook.styles';

const UploadBook = ({ theme, setRoute }: RouteProps): JSX.Element => {
    const [formFields, setFormFields] = useState(defaultUploadFormFields);
    const { title, author, description, isbn, frontImage, pdfBook, price, availability, condition, paymentMethods, shipping } = formFields;
    const { cost, delivery, tracking, policies } = shipping;
    const [openCatalog, setOpenCatalog] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);
    const [openPurchase, setOpenPurchase] = useState<boolean>(false);
    const [openShipping, setOpenShipping] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === "cost" || name === "delivery" || name === "tracking" || name === "policies") { 
            setFormFields({...formFields, shipping: { ...formFields.shipping, [name]: value}});
        } else { setFormFields({ ...formFields, [name]: value }); }
    }

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(uploadBookRoute);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <UploadBaseBackgroundContainer>
                <UploadedBackgroundWrapperOutline>
                <SquareWrapper>
                    <TitleHeadding>Please fill out the necessery information before publishing the book</TitleHeadding>

                    <div style={{display: 'flex'}}>
                        <ExplanationParagraph>Catalog information</ExplanationParagraph>
                        <CartItemButton buttonName={dropdownScroll} onClick={() => setOpenCatalog(!openCatalog)}>
                            <ButtonTitle buttonName={dropdownScroll}>{openCatalog? scrollUp: scrollDown}</ButtonTitle>
                        </CartItemButton>
                    </div>
                    <BottomScrollDownWrapper openDropdown={openCatalog}>
                        <form style={{width: "80%", margin: "0 auto"}}>
                            <FormInput type="text" name="title" value={title} 
                                onChange={handleChange} label="Title" required
                            />
                            <FormInput type="text" name="author" value={author}
                                onChange={handleChange} label="Author" required
                            />
                            <FormInput type="text" name="isbn" value={isbn} 
                                onChange={handleChange} label="ISBN" required
                            />
                            <HeadlineTitle>Description</HeadlineTitle>
                            <DescriptionLayout name="description" value={description} 
                                onChange={handleChange} placeholder="A simple description of the book" required
                            />
                        </form>
                    </BottomScrollDownWrapper>

                    <div style={{display: 'flex'}}>
                        <ExplanationParagraph>Data information</ExplanationParagraph>
                        <CartItemButton buttonName={dropdownScroll} onClick={() => setOpenData(!openData)}>
                            <ButtonTitle buttonName={dropdownScroll}>{openData? scrollUp: scrollDown}</ButtonTitle>
                        </CartItemButton>
                    </div>
                    <BottomScrollDownWrapper openDropdown={openData}>
                        <InputLabelWrapper>
                            <HeadlineTitle>Book Image: </HeadlineTitle>
                            <FormInput type="file" name="frontImage" accept=".png, .jpg, .jpeg" value={frontImage} 
                                onChange={handleChange} label={""} required
                            />
                        </InputLabelWrapper>
                        <InputLabelWrapper>
                            <HeadlineTitle>Book in PDF: </HeadlineTitle>
                            <FormInput type="file" name="pdfBook" accept="application/pdf" value={pdfBook} 
                                onChange={handleChange} label={""} required
                            />
                        </InputLabelWrapper>
                    </BottomScrollDownWrapper>

                    <div style={{display: 'flex'}}>
                        <ExplanationParagraph>Purchase information</ExplanationParagraph>
                        <CartItemButton buttonName={dropdownScroll} onClick={() => setOpenPurchase(!openPurchase)}>
                            <ButtonTitle buttonName={dropdownScroll}>{openPurchase? scrollUp: scrollDown}</ButtonTitle>
                        </CartItemButton>
                    </div>
                    <BottomScrollDownWrapper openDropdown={openPurchase}>
                        <form style={{width: "80%", margin: "0 auto"}}>
                            <InputLabelWrapper>
                                <HeadlineTitle>Price in $: </HeadlineTitle>
                                <FormInput type="text" name="price" value={price} 
                                    onChange={handleChange} label={""} required
                                />
                            </InputLabelWrapper>
                            <InputLabelWrapper>
                                <HeadlineTitle>Books in stock: </HeadlineTitle>
                                <FormInput type="text" name="availability" value={availability} 
                                    onChange={handleChange} label={""} required
                                />
                            </InputLabelWrapper>
                            <FormInput type="text" name="condition" value={condition} 
                                onChange={handleChange} label="Book Condition" required
                            />
                            <HeadlineTitle>Pyment Methods</HeadlineTitle>
                            <DescriptionLayout name="paymentMethods" value={paymentMethods} 
                                onChange={handleChange} placeholder="e.g.: PayPal, Google Pay, Apple Pay, Shopify Payments" required
                            />
                        </form>
                    </BottomScrollDownWrapper>

                    <div style={{display: 'flex'}}>
                        <ExplanationParagraph>Shipping information</ExplanationParagraph>
                        <CartItemButton buttonName={dropdownScroll} onClick={() => setOpenShipping(!openShipping)}>
                            <ButtonTitle buttonName={dropdownScroll}>{openShipping? scrollUp: scrollDown}</ButtonTitle>
                        </CartItemButton>
                    </div>
                    <BottomScrollDownWrapper openDropdown={openShipping}>
                        <form style={{width: "80%", margin: "0 auto"}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <HeadlineTitle>Cost in $: </HeadlineTitle>
                                <FormInput type="text" name="cost" value={cost} 
                                    onChange={handleChange} label={""} required
                                />
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <HeadlineTitle>Delivery duration in days: </HeadlineTitle>
                                <FormInput type="text" name="delivery" value={delivery} 
                                    onChange={handleChange} label={""} placeholder="e.g.: 1-3" required
                                />
                            </div>
                            <FormInput type="text" name="tracking" value={tracking} 
                                onChange={handleChange} label="Email / Phone" required
                            />
                            <HeadlineTitle>Policies</HeadlineTitle>
                            <DescriptionLayout name="policies" value={policies} 
                                onChange={handleChange} placeholder="Write the policies related to the book if any"
                            />
                        </form>
                    </BottomScrollDownWrapper>
                    {title && author && description && isbn && frontImage && 
                        pdfBook && price && availability && condition && paymentMethods.length && cost && delivery && tracking.length?
                        <SubmitButton onClick={() => {console.log("uploading the book in 3 .. 2 .. 1 .. xD")}}>Upload Book</SubmitButton> : null
                    }

                </SquareWrapper>
                </UploadedBackgroundWrapperOutline>
            </UploadBaseBackgroundContainer>
        </ThemeProvider>
    );
}

export default UploadBook;