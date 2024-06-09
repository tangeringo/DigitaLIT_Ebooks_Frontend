import React from "react";
import { RouteOptions } from "../../globalTypes";
import { editPdfRoute, homeRoute, libraryRoute, loginRoute, myBooksRoute, profileRoute } from "../../variables";

import { useSelector } from "react-redux";
import { selectIsCartOpen } from '../../redux/cart/cartSelectors';

import { Link } from "react-router-dom";
import appLogo from '../../assets/AppLogo/ebook.png';
import profileImg from '../../assets/ProfilePage/profileDefault.png';

import CartIcon from "../../components/cart-icon/cartIcon";
import CartDropdown from "../../components/cart-dropdown/cartDropdown.component";

import "bootstrap";

import { 
  NavigationContainer, 
  NavBarImage, 
  HamburgerMenuButton, 
  OuterRoutesContainer, 
  RoutesContainer, 
  RouteLink, 
  FormSearch, 
  InputSearch,
  NavBarProfileImage, 
} from "./navigation.styles";


interface NavBarProps {
  brandName: string;
  route: RouteOptions;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavBarProps> = ({ brandName, route, setSearchTerm }) => {
  const isCartOpen = useSelector(selectIsCartOpen);


  return (
      <NavigationContainer>
        <div className="container-fluid">
          <Link className="navbar-brand" to={homeRoute}>
            <NavBarImage route={route} src={appLogo} />
            <span className="fw-bolder fs-4 m-3 bg-dark">{brandName}</span>
          </Link>

          <HamburgerMenuButton data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
          </HamburgerMenuButton>

          <OuterRoutesContainer>
            <RoutesContainer>
              <RouteLink>
                <Link className={route === loginRoute? "nav-link active fw-bold" : "nav-link"} to={loginRoute}>Login</Link>
              </RouteLink>
              <RouteLink>
                <Link className={route === profileRoute? "nav-link active fw-bold" : "nav-link"} to={profileRoute}>Profile</Link>
              </RouteLink>
              <RouteLink>
                <Link className={route === myBooksRoute? "nav-link active fw-bold" : "nav-link"} to={myBooksRoute}>My Books</Link>
              </RouteLink>
              <RouteLink>
                <Link className={route === libraryRoute? "nav-link active fw-bold" : "nav-link"} to={libraryRoute}>Library</Link>
              </RouteLink>
            </RoutesContainer>
          
            <FormSearch>
              { route === editPdfRoute? <p style={{color: "white", margin: "10px 25px 0 0"}}>save button</p> : null }
              { route === profileRoute? <NavBarProfileImage src={profileImg}/> : null}
              { route === libraryRoute || route === myBooksRoute? <InputSearch onChange={(event) => setSearchTerm(event.target.value)} /> : null}
              <CartIcon />
            </FormSearch>
            
            {isCartOpen && <CartDropdown />}
          </OuterRoutesContainer>
        </div>
      </NavigationContainer>
  )
}

export default Navigation;