import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import {
  getUsers,
  getOneUser,
  postUser,
  updateUser,
  deleteUser,
  getSearchUsers,
  getNumberOfAccounts
} from '../services/api/user';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUser] = useState([]);

  const contextGetUsers = async () => {
    try {
      const response = await getUsers();
      setUser(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextGetNumberOfAccounts = async () => {
    try {
      const response = await getNumberOfAccounts();
      return response;
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextGetSearchUsers = async payload => {
    try {
      const response = await getSearchUsers(payload);
      setUser(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextGetOneUser = async payload => {
    try {
      const response = await getOneUser(payload);
      return response;
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextPostUser = async payload => {
    try {
      await postUser(payload);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextUpdateUser = async (id, payload) => {
    try {
      await updateUser(id, payload);
      //toast.info(`Bem vindo ${response}`);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextDeleteUser = async payload => {
    try {
      const response = await deleteUser(payload);
      //setUser(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        contextGetUsers,
        contextGetOneUser,
        users,
        contextDeleteUser,
        contextPostUser,
        contextUpdateUser,
        contextGetSearchUsers,
        contextGetNumberOfAccounts
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  const {
    contextGetUsers,
    contextGetOneUser,
    users,
    contextDeleteUser,
    contextPostUser,
    contextUpdateUser,
    contextGetSearchUsers,
    contextGetNumberOfAccounts
  } = context;
  return {
    contextGetUsers,
    contextGetOneUser,
    users,
    contextDeleteUser,
    contextPostUser,
    contextUpdateUser,
    contextGetSearchUsers,
    contextGetNumberOfAccounts
  };
}
