import React, { useEffect } from 'react';
import { RouteProps } from '../../data/types/types.global';
import variables from '../../data/variables/variables.static.json';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ThemeProvider } from 'styled-components';
import { 
    ProfileBaseBackgroundContainer,
    ProfileBaseContainer, 
    StraitLineContainer, 
    ProfilePictureContainer, 
    ProfilePictureImg, 
    ProfileNameContainer, 
    MyContainers, 
    MyStoryContainer, 
    MyInfoContainer, 
    StraitLineInfoContainer, 
    Profiletext 
} from './profile.styles';



const ProfilePage: React.FC<RouteProps> = ({ theme, setRoute }) => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (navbarToggler as HTMLElement)?.click();
      }, [navbarToggler]);

    useEffect(() => {
        if (!currentUser?.accessToken && !currentUser?.refreshToken) { navigate(variables.routes.login) }
    }, [currentUser?.accessToken, currentUser?.refreshToken, navigate]);

    useEffect(() => {
        dispatch(setIsCartOpen(false));
        setRoute(variables.routes.profile);
    }, [dispatch, setRoute]);

    return (
        <ThemeProvider theme={theme}>
            <ProfileBaseBackgroundContainer>
                <ProfileBaseContainer>
                    <StraitLineContainer>
                        <ProfilePictureContainer>
                            <ProfilePictureImg/>
                        </ProfilePictureContainer>
                        <div>
                            <ProfileNameContainer>
                                <Profiletext>[USER NAME]</Profiletext>
                            </ProfileNameContainer>
                            <MyContainers>
                                <MyStoryContainer>
                                    <Profiletext>[NAME'S story / bio:] [SIMPLE DESCRIPTION STORY ABOUT WHO THEY ARE AND ARE LOOKING FOR ]</Profiletext>
                                </MyStoryContainer>
                                <MyInfoContainer>
                                    <Profiletext>[NAME'S information:] [SIMPLE INFORMATON WRITTEN IN BULLETPOINTS ABOUT GOALS / ACHIEVEMENTS ETC...]</Profiletext>
                                </MyInfoContainer>
                            </MyContainers>
                        </div>
                    </StraitLineContainer>
                    <StraitLineInfoContainer>
                        <p>connect with [NAME] through: [2-3 SOCIAL MEDIA ICONS]</p>
                    </StraitLineInfoContainer>
                </ProfileBaseContainer>
            </ProfileBaseBackgroundContainer>
        </ThemeProvider>
    );
}

export default ProfilePage;