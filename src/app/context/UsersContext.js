import { createContext } from 'react';

export const defaultObject = {
    isUserLogged: false,
    toggleLoggedState: () => {},

    username: '',
    setUsername: () => {},

    favoriteCurrencies: [],
    setFavoriteCurrencies: () => {}
}

export const UsersContext = createContext(defaultObject);