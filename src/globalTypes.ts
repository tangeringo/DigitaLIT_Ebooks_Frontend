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
    editPdfRoute
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

// THEME TOGGLER COMPONENT
export interface ThemeTogglerProps {
  themeTitle: string,
  setThemeTitle: React.Dispatch<React.SetStateAction<string | undefined>>
}

// MY BOOK COMPONENT
export type CartItemInfo = {
  id: number;
  showBook: boolean;
}

// BOOK ITEM COMPONENT
export interface MyBookProps {
  book: BookItem,
  buttonName: string,
  cartItemInfo?: CartItemInfo | undefined,
  setCartItemInfo?: React.Dispatch<React.SetStateAction<CartItemInfo>> | undefined
}

// CHECKOUT ITEM COMPONENT
export type CheckouComponnetProps = {
  cartItem: CartItem;
}

// LIBRARY PAGE
export type LibraryPageProps = RouteProps & {
  filteredBooks: BookItem[], 
}


// CHECKOUT PAGE
export type StripeTypes = {
    clientSecret: string;
    appearance: {
      theme: "stripe" | "night",
      variables: {
        colorPrimary: string
      }
    }
  };
  
  export type CheckoutCardProps = {
    theme: ThemeType,
    secret: any
  }

  export type LoginPayload = {
    name?: string | undefined;
    email: string;
    password: string;
  }