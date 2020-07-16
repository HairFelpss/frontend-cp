import React, { useState } from 'react';
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
  see: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main
  },
  finish: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    marginLeft: '1%'
  },
  reOpen: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
    marginLeft: '1%'
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
    alignContent: 'center',
    justifyContent: 'space-evenly'
  },
  statusContainer: { textTransform: 'capitalize' },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  subject: {
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
  const { className, onClose, variant, open, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const statusColors = {
    open: 'success',
    pending: 'info',
    close: 'danger'
  };

  const userCategory = {
    late: (
      <div className={classes.categoryRow}>
        <WatchLaterIcon className={classes.see} />
        atraso
      </div>
    ),
    bug: (
      <div className={classes.categoryRow}>
        <BugReportIcon className={classes.finish} />
        bug
      </div>
    ),
    question: (
      <div className={classes.categoryRow}>
        <HelpIcon className={classes.reOpen} />
        duvida
      </div>
    )
  };

  const [l_date, setL_date] = React.useState('');
  const [l_status, setL_status] = React.useState('');
  const [l_ticketSolver, setL_ticketSolver] = React.useState('');
  const [l_category, setL_category] = React.useState('');

  const handleChangeDate = event => {
    setL_date(event.target.value);
  };
  const handleChangeStatus = event => {
    setL_status(event.target.value);
  };
  const handleChangeTicketSolver = event => {
    setL_ticketSolver(event.target.value);
  };
  const handleChangeCategory = event => {
    setL_category(event.target.value);
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

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <div container className={classes.btnGroup}>
            <Button variant="outlined" className={classes.see}>
              Visualizar
            </Button>
            <Button variant="outlined" className={classes.finish}>
              Encerrar
            </Button>
            <Button variant="outlined" className={classes.reOpen}>
              Reabrir
            </Button>
          </div>
        }
        action={
          <Grid container className={classes.grid}>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Data</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={l_date}
                  onChange={handleChangeDate}
                >
                  <MenuItem value={0}>23/12/29</MenuItem>
                  <MenuItem value={1}>23/12/29</MenuItem>
                  <MenuItem value={2}>23/12/29</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={l_status}
                  onChange={handleChangeStatus}
                >
                  <MenuItem value={0}>Open</MenuItem>
                  <MenuItem value={1}>Close</MenuItem>
                  <MenuItem value={2}>Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Atendente</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={l_ticketSolver}
                  onChange={handleChangeTicketSolver}
                >
                  <MenuItem value={0}>GM Claytchola</MenuItem>
                  <MenuItem value={1}>Cabelin firmezao</MenuItem>
                  <MenuItem value={2}>ADM Peixero</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={l_category}
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={0}>Bugs</MenuItem>
                  <MenuItem value={1}>Duvidas</MenuItem>
                  <MenuItem value={2}>Atraso</MenuItem>
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
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
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
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">#{user.ref}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={classes.subject}>
                        {user.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={classes.category}>
                        {userCategory[user.category]}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[user.status]}
                          size="sm"
                        />
                        {user.status}
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
        <TablePagination
          component="div"
          count={users.length}
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
  users: PropTypes.array.isRequired
};

export default TicketsTable;
