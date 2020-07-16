import React, { createContext, useContext, useState } from 'react';

import {
  getUsers,
  getOneUser,
  postUser,
  updateUser,
  deleteUser
} from '../services/api/user';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUser] = useState([]);

  const contextGetUsers = async () => {
    try {
      const response = await getUsers();
      setUser(response);
    } catch (err) {
      console.log(err);
    }
  };

  const contextGetOneUser = async payload => {
    try {
      const response = await getOneUser(payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const contextPostUser = async payload => {
    try {
      const response = await postUser(payload);
      //setUser(response);
    } catch (err) {
      console.log(err);
    }
  };

  const contextUpdateUser = async (id, payload) => {
    try {
      const response = await updateUser(id, payload);
      //setUser(response);
    } catch (err) {
      console.log(err);
    }
  };

  const contextDeleteUser = async payload => {
    try {
      const response = await deleteUser(payload);
      //setUser(response);
    } catch (err) {
      console.log(err);
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
        contextUpdateUser
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
    contextUpdateUser
  } = context;
  return {
    contextGetUsers,
    contextGetOneUser,
    users,
    contextDeleteUser,
    contextPostUser,
    contextUpdateUser
  };
}
