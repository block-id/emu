import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import UserService from 'common/services/UserService';

const userService = new UserService();
const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelLoad = false;

    userService.getCurrentUser().then((value) => {
      if (!cancelLoad) { setUser(value); setIsLoaded(true); }
    }).catch((error) => {
      if (error.response.status < 500) {
        setIsLoaded(true);
      }
    });

    // Avoid changing state if the component has unmounted
    return () => {
      cancelLoad = true;
    };
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, isLoaded]}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContext => useContext(UserContext) as UserContext;

export { UserProvider, useUser };
