import { createContext } from 'react';

export const defaultObject = {
    isUserLogged: false,
    toggleLoggedState: () => {},

    username: '',
    setUsername: () => {},

}

export const UsersContext = createContext(defaultObject);