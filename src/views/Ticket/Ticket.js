import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TicketsToolbar, TicketsTable } from './components';

import {
  getTickets,
  getSearchTickets,
  postFilterTickets,
  postTicket,
  updateTickets,
  deleteTickets
} from '../../services/api/tickets';

import { useUser } from '../../context/User';

import useStorage from '../../utils/useStorage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Ticket = () => {
  const classes = useStyles();
  const { contextGetManagers } = useUser();

  const [managers, setManagers] = useState([]);

  const [tickets, setTickets] = useState([]);
  const [storageChatId, setStorageChatId] = useStorage('chatId');

  const handleGetTickets = async () => {
    setTickets(await getTickets());
  };

  const handleSearchTickets = async payload => {
    setTickets(await getSearchTickets(payload));
  };

  const handleFilterTickets = async payload => {
    setTickets(await postFilterTickets(payload));
  };

  const handleGetManagers = async () => {
    setManagers(await contextGetManagers());
  };

  const handleDeleteTicket = async id => {
    if (id.length > 1) return;
    await deleteTickets(id[0]);
    handleGetTickets();
  };

  useEffect(() => {
    handleGetTickets();
    handleGetManagers();
  }, []);

  return (
    <div className={classes.root}>
      <TicketsToolbar handleSearchTickets={handleSearchTickets} />
      <div className={classes.content}>
        <TicketsTable
          tickets={tickets}
          handleFilterTickets={handleFilterTickets}
          handleGetTickets={handleGetTickets}
          handleDeleteTicket={handleDeleteTicket}
          setStorageChatId={setStorageChatId}
          managers={managers}
        />
      </div>
    </div>
  );
};

export default Ticket;
