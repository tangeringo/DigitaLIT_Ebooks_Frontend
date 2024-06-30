import axios from "axios";

export const appName = "DigitaLIT";
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


export const businessGenre = "Business";
export const psychologyGenre = "Psychology";
export const itGenre = "IT";
export const physicsGenre = "Physics";


export const mediaPixelsWidth1600 = "1600px";
export const mediaPixelsWidth1400 = "1400px";
export const mediaPixelsWidth1200 = "1200px";
export const mediaPixelsWidth910 = "910px";
export const mediaPixelsWidth770 = "770px";
export const mediaPixelsWidth720 = "720px";
export const mediaPixelsWidth600 = "600px";


export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_USERS_URL
});



// INITIAL LOGIN STATE
export const defaultLoginFormFields = {
    email: '',
    password: '',
};


// INITIAL CREATE ACCOUNT STATE
export const defaultCreateAccountFormFields = {
    displayName: '',
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