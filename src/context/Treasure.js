import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

import {
  getTreasures,
  getOneTreasure,
  postTreasure,
  updateTreasure,
  deleteTreasure,
  getSearchTreasures
} from '../services/api/treasure';

const TreasureContext = createContext();

export default function TreasureProvider({ children }) {
  const [treasures, setTreasure] = useState([]);

  const contextGetTreasures = async () => {
    try {
      const response = await getTreasures();
      setTreasure(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextGetSearchTreasures = async payload => {
    try {
      const response = await getSearchTreasures(payload);
      setTreasure(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextGetOneTreasure = async payload => {
    try {
      const response = await getOneTreasure(payload);
      return response;
    } catch (err) {
      console.log('err => ', err);
    }
  };
  const contextPostTreasure = async payload => {
    try {
      await postTreasure(payload);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextUpdateTreasure = async (id, payload) => {
    try {
      await updateTreasure(id, payload);
      //toast.info(`Bem vindo ${response}`);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  const contextDeleteTreasure = async id => {
    try {
      const response = await deleteTreasure(id);
      //setTreasure(response);
    } catch (err) {
      console.log('err => ', err);
    }
  };

  return (
    <TreasureContext.Provider
      value={{
        contextGetTreasures,
        contextGetOneTreasure,
        treasures,
        contextDeleteTreasure,
        contextPostTreasure,
        contextUpdateTreasure,
        contextGetSearchTreasures
      }}
    >
      {children}
    </TreasureContext.Provider>
  );
}

export function useTreasure() {
  const context = useContext(TreasureContext);
  if (!context)
    throw new Error('useTreasure must be used within a TreasureProvider');
  const {
    contextGetTreasures,
    contextGetOneTreasure,
    treasures,
    contextDeleteTreasure,
    contextPostTreasure,
    contextUpdateTreasure,
    contextGetSearchTreasures
  } = context;
  return {
    contextGetTreasures,
    contextGetOneTreasure,
    treasures,
    contextDeleteTreasure,
    contextPostTreasure,
    contextUpdateTreasure,
    contextGetSearchTreasures
  };
}
