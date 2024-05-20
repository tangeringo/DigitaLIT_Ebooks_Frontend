export const appName = "DigitaLIT";
export const serverHost = "http://localhost:8000"   // this into .env

export const moreInfo = "...";
export const closeButton = "x"
export const addToCart = "Add to cart";
export const showBook = "Show book";

export const REACT_PUBLISHABLE_KEY = "pk_test_51KEX2rKDqxO1AAP3V4yuAGW0ZVqmNiAgK0VDAjTTNRN3kCMRI9bZGi2iTwXUhePayYSd5EmxBTdCXMNR0EPDHmoY00yERUY7vb";   // this into .env


// this into .env
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
// this into .env


export const mediaPixelsWidth1600 = "1600px";
export const mediaPixelsWidth1400 = "1400px";
export const mediaPixelsWidth1200 = "1200px";
export const mediaPixelsWidth910 = "910px";
export const mediaPixelsWidth720 = "720px";
export const mediaPixelsWidth600 = "600px";



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