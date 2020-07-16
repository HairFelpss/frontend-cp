import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import handleAuth from '../services/api/auth';

import useStorage from '../utils/useStorage';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [storageAuth, setStorageAuth] = useStorage('token');
  const [userStorageAuth, setUserStorageAuth] = useStorage('user');

  const signIn = async payload => {
    try {
      const response = await handleAuth(payload);
      console.log('response =>', response);
      setStorageAuth(response.token);
      setUserStorageAuth(response.user);
      toast.info(`Bem vindo ${response.user.name}`);
    } catch (err) {
      console.log(err);
      toast.error('Alguma coisa ta errada');
    }
  };

  const signOut = () => {
    setStorageAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!storageAuth,
        userStorageAuth,
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
  const { signed, userStorageAuth, storageAuth, signIn, signOut } = context;
  return { signed, userStorageAuth, storageAuth, signIn, signOut };
}
