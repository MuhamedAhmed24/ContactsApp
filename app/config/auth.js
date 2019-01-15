
// function of auth methods to navigate to currenct user state

import { AsyncStorage } from 'react-native';

export const USER_KEY = 'auth-key';

// saving username on storage and validate successful login on Auth navigation screen
export const onSignIn = userName => AsyncStorage.setItem(USER_KEY, userName);

// remove from the storage for logging out
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);
