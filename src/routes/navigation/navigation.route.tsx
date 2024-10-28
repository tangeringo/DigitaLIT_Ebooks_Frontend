import React from "react";
import { NavBarProps } from "../../data/types/types.global";
import variables from "../../data/variables/variables.static.json";

import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import { Link } from "react-router-dom";
import appLogo from '../../assets/AppLogo/ebook.png';
import profileImg from '../../assets/ProfilePage/profileDefault.png';

import CartIcon from "../../components/cart-icon/cartIcon.component";
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
  LogOutTag,
  RoutesContainerAfterAuth, 
} from "./navigation.styles";


const Navigation: React.FC<NavBarProps> = ({ brandName, route, setSearchTerm }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const logOut = () => { dispatch(signOutStart()) }

  return (
      <NavigationContainer>
        <div className="container-fluid">
          <Link className="navbar-brand" to={variables.routes.home}>
            <NavBarImage route={route} src={appLogo} />
            <span className="fw-bolder fs-4 m-3 bg-dark">{brandName}</span>
          </Link>

          <HamburgerMenuButton data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
          </HamburgerMenuButton>

          <OuterRoutesContainer>
            <RoutesContainer>
              { currentUser?.accessToken?
                <RoutesContainerAfterAuth>
                  <RouteLink>
                    <Link className={route === variables.routes.profile? "nav-link active fw-bold" : "nav-link"} to={variables.routes.profile}>Profile</Link>
                  </RouteLink>
                  <RouteLink>
                    <Link className={route === variables.routes.myBooks? "nav-link active fw-bold" : "nav-link"} to={variables.routes.myBooks}>My Books</Link>
                  </RouteLink>
                  <RouteLink>
                    <Link className={route === variables.routes.library? "nav-link active fw-bold" : "nav-link"} to={variables.routes.library}>Library</Link>
                  </RouteLink>
                  <RouteLink>
                    <Link className={route === variables.routes.uploadBook? "nav-link active fw-bold" : "nav-link"} to={variables.routes.uploadBook}>Upload Book</Link>
                  </RouteLink>
                </RoutesContainerAfterAuth>
                : <RouteLink>
                  <Link className={route === variables.routes.login? "nav-link active fw-bold" : "nav-link"} to={variables.routes.login}>Login</Link>
                </RouteLink>
              }
            </RoutesContainer>
          
            { currentUser?.accessToken? 
              <FormSearch>
                <RouteLink>
                  <LogOutTag onClick={logOut}>Log OUT</LogOutTag>
                </RouteLink>
                <div style={{display: "flex"}}>
                  { route === variables.routes.editPdf? <p style={{color: "white", margin: "10px 25px 0 0"}}>save button</p> : null }
                  { route === variables.routes.profile? <NavBarProfileImage src={profileImg}/> : null}
                  { route === variables.routes.library? <InputSearch onChange={(event) => setSearchTerm(event.target.value)} /> : null}
                  <CartIcon />
                </div>
              </FormSearch>
              : null 
            }
            
            {isCartOpen && <CartDropdown />}
          </OuterRoutesContainer>
        </div>
      </NavigationContainer>
  )
}

export default Navigation;


// on refresh the accessToken token gets removed, but the "id" and "refresh token" stay .. refresh the accessToken token on refresh if the refresh token still exists.