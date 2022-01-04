import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import UserService from 'common/services/UserService';

const userService = new UserService();
const UserContext = createContext<UserContext | undefined>(undefined);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    let cancelLoad = false;

    userService.getCurrentUser().then((value) => {
      if (!cancelLoad) {
        setUser(value);
      }
    }).catch((error) => {
      if (error.response.status < 500) {
        setUser(null);
      }
    });

    // Avoid changing state if the component has unmounted
    return () => {
      cancelLoad = true;
    };
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContext => useContext(UserContext) as UserContext;

export { UserProvider, useUser };
