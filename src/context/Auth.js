import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import handleAuth from '../services/api/auth';

import useStorage from '../utils/useStorage';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [storageAuth, setStorageAuth] = useStorage('token');

  const signIn = async payload => {
    try {
      const response = await handleAuth(payload);
      setAuth(response.user);
      setStorageAuth(response.user, response.token);
      toast.info(`Bem vindo ${response.user.name}`);
    } catch (err) {
      console.log(err);
      toast.error('Alguma coisa ta errada');
    }
  };

  const signOut = () => {
    setAuth(null);
    setStorageAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!storageAuth, auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  const { signed, auth, signIn, signOut } = context;
  return { signed, auth, signIn, signOut };
}
