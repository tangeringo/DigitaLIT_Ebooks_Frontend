import axios from "axios";

export const appName = "DigitaLIT";
export const apiUrl = "http://37.46.209.133/api";
export const react_public_key = "pk_test_51KEX2rKDqxO1AAP3V4yuAGW0ZVqmNiAgK0VDAjTTNRN3kCMRI9bZGi2iTwXUhePayYSd5EmxBTdCXMNR0EPDHmoY00yERUY7vb";

export const moreInfo = "...";
export const closeButton = "x"
export const addToCart = "Add to cart";
export const showBook = "Show book";


export const homeRoute = "/";
export const loginRoute = "/login";
export const createAccountRoute = "/create-account";
export const resetPasswordRoute = "/reset-password";
export const profileRoute = "/profile";
export const myBooksRoute = "/my-books";
export const displayBookInfoRoute = "/display-book-info";
export const viewPdfRoute = "/view-pdf";
export const editPdfRoute = "/edit-pdf"
export const libraryRoute = "/library";
export const checkoutRoute = "/checkout";


export const mediaPixelsWidth1600 = "1600px";
export const mediaPixelsWidth1400 = "1400px";
export const mediaPixelsWidth1200 = "1200px";
export const mediaPixelsWidth910 = "910px";
export const mediaPixelsWidth720 = "720px";
export const mediaPixelsWidth600 = "600px";


export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? apiUrl
});



// INITIAL LOGIN STATE
export const defaultLoginFormFields = {
    email: '',
    password: '',
};


// INITIAL CREATE ACCOUNT STATE
export const defaultCreateAccountFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

// INITIAL RESET PASSWORD STATE
export const defaultResetPasswordFormFields = {
    newPassword: '',
    confirmPassword: '',
};

// DEFAULT CART ITEM INFO STATE
export const defaultCartItemInfoState = {
    id: 0, showBook: false
};