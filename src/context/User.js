import React, { createContext, useContext } from 'react';

import handleUser from '../services/api/user';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const getUsers = async () => {
    try {
      const response = handleUser();
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ getUsers }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  const { getUsers } = context;
  return { getUsers };
}
