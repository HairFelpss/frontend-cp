import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Checkbox,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Divider
} from '@material-ui/core';
import BugReportIcon from '@material-ui/icons/BugReport';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HelpIcon from '@material-ui/icons/Help';
import { StatusBullet } from 'components';

import 'moment/locale/pt-br';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  grid: {},
  btnGroup: {
    display: 'flex',
    flexAlign: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly'
  },
  filter: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginLeft: '1%'
  },
  finish: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginLeft: '1%'
  },
  see: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  reset: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main
  },
  formControl: {
    minWidth: 160,
    padding: '0 5px'
  },
  tableCell: { color: theme.palette.text.primary, fontSize: 15 },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  label: {
    position: 'relative',
    top: 55
  },
  lab: {
    fontSize: 20
  },
  category: { textTransform: 'capitalize' },
  categoryRow: {
    display: 'flex',
    alignContent: 'center'
  },
  categoryLate: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginRight: '2%'
  },
  categoryBug: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginRight: '2%'
  },
  categoryQuestion: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    marginRight: '2%'
  },
  statusContainer: { textTransform: 'capitalize' },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'space-between'
  },
  title: {
    maxWidth: '300px',
    whiteSpace: ' nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: '15px',
      height: '15px'
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundImage: 'linear-gradient(45deg, #2196f3, #353c45)',
      boxShadow: '#353C45 0 3px 13px 1px',
      webkitBoxShadow: '#353C45 0 3px 13px 1px'
    }
  }
}));

const TicketsTable = props => {
  const {
    className,
    onClose,
    variant,
    open,
    tickets,
    handleFilterTickets,
    handleGetTickets,
    handleDeleteTicket,
    handleSeeTicket,
    setStorageChatId,
    ticketCategory,
    ticketStatus,
    managers,
    ...rest
  } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [filters, setFilters] = useState({
    selects: {
      category: null,
      helper: null,
      status: null
    }
  });

  const handleChange = event => {
    event.persist();

    setFilters(filters => ({
      ...filters,
      selects: {
        ...filters.selects,
        [event.target.name]: event.target.value
      }
    }));
  };

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const statusColors = {
    2: 'success',
    1: 'danger',
    0: 'warning'
  };
  const status = {
    0: 'Aberto',
    1: 'Cancelado',
    2: 'Resolvido'
  };

  const userCategory = {
    2: (
      <span className={classes.categoryRow}>
        <WatchLaterIcon className={classes.categoryLate} />
        atraso
      </span>
    ),
    0: (
      <span className={classes.categoryRow}>
        <BugReportIcon className={classes.categoryBug} />
        bug
      </span>
    ),
    1: (
      <span className={classes.categoryRow}>
        <HelpIcon className={classes.categoryQuestion} />
        duvida
      </span>
    )
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <div className={classes.btnGroup}>
            {selectedUsers.length === 0 || selectedUsers.length > 1 ? (
              <Button variant="outlined" className={classes.see}>
                Visualizar
              </Button>
            ) : (
              <Link
                to={{
                  pathname: '/chat'
                }}
              >
                <Button
                  variant="outlined"
                  className={classes.see}
                  onClick={() => setStorageChatId(selectedUsers[0])}
                >
                  Visualizar
                </Button>
              </Link>
            )}
            <Button
              variant="outlined"
              className={classes.finish}
              onClick={() => handleDeleteTicket(selectedUsers)}
            >
              Encerrar
            </Button>
            <Button
              variant="outlined"
              className={classes.filter}
              onClick={() => handleFilterTickets(filters.selects)}
            >
              Filtrar
            </Button>
          </div>
        }
        action={
          <Grid container className={classes.grid}>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="status"
                  value={filters.selects.status || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'0'}>Aberto</MenuItem>
                  <MenuItem value={1}>Cancelado</MenuItem>
                  <MenuItem value={2}>Resolvido</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Atendente</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="helper"
                  value={filters.selects.helper || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {managers.map(manager => (
                    <MenuItem value={manager.ID} key={manager.ID}>
                      {manager.truename}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="category"
                  value={filters.selects.category || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Duvidas</MenuItem>
                  <MenuItem value={2}>Atraso</MenuItem>
                  <MenuItem value={'0'}>Bug</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      />

      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar className={classes.scrollbar}>
          <div className={classes.inner}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell padding="checkbox" className={classes.tableCell}>
                    <Checkbox
                      checked={selectedUsers.length === tickets.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < tickets.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>Codigo</TableCell>
                  <TableCell className={classes.tableCell}>Assunto</TableCell>
                  <TableCell className={classes.tableCell}>Categoria</TableCell>
                  <TableCell className={classes.tableCell}>
                    Solicitante
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    Data do Ticket
                  </TableCell>
                  <TableCell className={classes.tableCell}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.slice(0, rowsPerPage).map(ticket => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={ticket.id}
                    selected={selectedUsers.indexOf(ticket.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(ticket.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, ticket.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">#{ticket.id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={classes.title}>
                        {ticket.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={classes.category}>
                        {userCategory[ticket.category]}
                      </Typography>
                    </TableCell>
                    <TableCell>{ticket.helped.email}</TableCell>
                    <TableCell>
                      {moment(ticket.created_at).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[ticket.status]}
                          size="sm"
                        />
                        {status[ticket.status]}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="outlined"
          className={classes.reset}
          onClick={() => handleGetTickets()}
        >
          Resetar
        </Button>
        <TablePagination
          component="div"
          count={tickets.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

TicketsTable.propTypes = {
  className: PropTypes.string,
  tickets: PropTypes.array.isRequired
};

export default TicketsTable;
