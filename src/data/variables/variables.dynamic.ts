import axios from "axios";
import variables from './variables.static.json';

export const dropdownScroll = variables.buttons.scrollDown || variables.buttons.scrollUp;
export const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_USERS_URL
    baseURL: process.env.REACT_APP_USERS_URL_LOCAL
});
