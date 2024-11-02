import { BookItem } from '../../redux/library/library.types';
import { CartItem } from '../../redux/cart/cart.types';

import variables from "../variables/variables.static.json";

export type RouteOptions = 
typeof variables.routes.home | 
typeof variables.routes.login | 
typeof variables.routes.register | 
typeof variables.routes.resetPassword | 
typeof variables.routes.profile | 
typeof variables.routes.myBooks | 
typeof variables.routes.displayBookInfo | 
typeof variables.routes.viewPdf | 
typeof variables.routes.editPdf | 
typeof variables.routes.uploadBook |
typeof variables.routes.library | 
typeof variables.routes.checkout;

// APP
interface Book {
  id: number;
  img: string;
  name: string;
  price: number;
  copyright: string;
  description: string;
}

export interface BooksLibrary {
  business: Book[];
  psychology: Book[];
  technology: Book[];
  physics: Book[];
}

export type ThemeType = {
    background: string,
    backgroundSecondary: string
    textPrimary: string,
    textSecondary: string,
    border: string,
    formBackground: string
}

export interface RouteProps {
  theme: ThemeType,
  setRoute: (options: RouteOptions) => void
}

export interface NavBarProps {
  brandName: string;
  route: RouteOptions;
  setSearchTerm: (searchTerm: string) => void;
}

// THEME TOGGLER COMPONENT
export interface ThemeTogglerProps { currentTheme: string }

// MY BOOK COMPONENT
export interface CartItemInfo {
  id: number;
  showBook: boolean;
}

// BOOK ITEM COMPONENT
interface cartItemInfoAddition {
  cartItemInfo?: CartItemInfo | undefined,
  setCartItemInfo?: (cartInfo: CartItemInfo) => void | undefined
}

export type MyBookProps = cartItemInfoAddition & {
  book: BookItem,
  buttonName: string,
}

// CHECKOUT ITEM COMPONENT
export type CheckouComponnetProps = {
  cartItem: CartItem;
}

// LIBRARY PAGE
export type GenreBookObject = cartItemInfoAddition & {
  genre: string;
  books: BookItem[];
}

export type LibraryPageProps = RouteProps & {
  filteredBooks: GenreBookObject[], 
}


// CHECKOUT PAGE
export type StripeTypes = {
    clientSecret: string;
    appearance: {
      theme: "stripe" | "night",
      variables: {
        colorPrimary: string;
      }
    }
  };
  
export interface CheckoutCardProps {
  theme: ThemeType;
  secret: any;
}

export type PaylemtPayload = CurrentUserType & {
  amount: number;
}

// LOGIN PAGE
export interface LoginPayload {
  displayName?: string | undefined;
  email: string;
  password: string;
}

export interface TokenType {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export type CurrentUserType = TokenType & {
  id?: string | undefined;
}

// LOGIN PAGE ~ FIREBASE
export interface AdditionalInfo {
  displayName?: string;
  providerId?: string | null;
}

export interface UserData {
  email: string | null;
  displayName: string | null;
  providerId: string;
}


// RESET-PASSWORD PAGE
export type PasswordStrengthTypes = 
  typeof variables.passwordStrength.weak | 
  typeof variables.passwordStrength.good | 
  typeof variables.passwordStrength.medium | 
  typeof variables.passwordStrength.strong

export type ResetPasswordPayload = CurrentUserType & {
  newPassword: string;
}
