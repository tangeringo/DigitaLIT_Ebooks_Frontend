import { BookItem } from './redux/library/libraryTypes';
import { CartItem } from './redux/cart/cartTypes';

import { 
    homeRoute, 
    loginRoute, 
    createAccountRoute, 
    resetPasswordRoute, 
    profileRoute, 
    myBooksRoute, 
    displayBookInfoRoute, 
    libraryRoute, 
    checkoutRoute, 
    viewPdfRoute,
    editPdfRoute,
    uploadBookRoute
} from './variables';

export type RouteOptions = 
typeof homeRoute | 
typeof loginRoute | 
typeof createAccountRoute | 
typeof resetPasswordRoute | 
typeof profileRoute | 
typeof myBooksRoute | 
typeof displayBookInfoRoute | 
typeof viewPdfRoute | 
typeof editPdfRoute | 
typeof uploadBookRoute |
typeof libraryRoute | 
typeof checkoutRoute;

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
export interface ThemeTogglerProps {
  themeTitle: string,
  setThemeTitle: (title: string | undefined) => void;

}

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


// LOGIN PAGE
export interface LoginPayload {
  displayName?: string | undefined;
  email: string;
  password: string;
}

export interface TokenType {
  access: string | undefined;
  refresh: string | undefined;
}

export type LoginProps = RouteProps & {
  tokens: TokenType;
  setTokens: (tokens: TokenType) => void;
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