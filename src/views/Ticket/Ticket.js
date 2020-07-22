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

  const [tickets, setTickets] = useState([]);

  const handleGetTickets = async () => {
    setTickets(await getTickets());
  };

  const handleSearchTickets = async payload => {
    setTickets(await getSearchTickets(payload));
  };

  const handleFilterTickets = async payload => {
    setTickets(await postFilterTickets(payload));
  };

  const handleDeleteTicket = async id => {
    console.log(id.length);
    if (id.length > 1) return;
    console.log('passo => ', id);
    await deleteTickets(id[0]);
    handleGetTickets();
  };

  useEffect(() => {
    handleGetTickets();
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
        />
      </div>
    </div>
  );
};

export default Ticket;
