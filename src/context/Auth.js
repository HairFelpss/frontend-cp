import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';

import handleAuth from '../services/api/auth';

import useStorage from '../utils/useStorage';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [storageAuth, setStorageAuth] = useStorage('token');
  const [storageUserId, setStorageUserId] = useStorage('userId');

  const signIn = async payload => {
    try {
      const response = await handleAuth(payload);
      setStorageAuth(response.token);
      setStorageUserId(response.user.id);
      toast.info(`Bem vindo ${response.user.name}`);
    } catch (err) {
      console.log(err);
      toast.error('Alguma coisa ta errada');
    }
  };

  const signOut = () => {
    setStorageAuth(null);
    setStorageUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!storageAuth,
        storageUserId,
        storageAuth,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  const { signed, storageUserId, storageAuth, signIn, signOut } = context;
  return { signed, storageUserId, storageAuth, signIn, signOut };
}
