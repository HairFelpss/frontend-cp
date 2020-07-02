import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
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

import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  drawer: {
    width: 240,
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  grid: {
    
  },
  divider: {
    marginTop: 54.5,
    margin: theme.spacing(2)
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main
  },
  formControl: { 
    minWidth: 160,
    position: "relative",
    top: 35
  },

  select: {
    color: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
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
    position: "relative",
    top: 55    
  },
  lab: {
    fontSize: 20
  },
  status: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TicketsTable = props => {
  const { className,onClose, variant, open , users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const statusColors = {
    open: 'success',
    pending: 'info',
    close: 'danger'
  };


  const [l_data, setL_data] = React.useState('');
  const [l_status, setL_status] = React.useState('');
  const [l_solicitante, setL_solicitante] = React.useState('');

  const handleChangedata = (event) => {
      setL_data(event.target.value);

  };
  const handleChangestatus = (event) => {
      setL_status(event.target.value);

  };
  const handleChangesolicitante = (event) => {
      setL_solicitante(event.target.value);

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
      <CardContent className={classes.content}>
      <Grid  container className={classes.grid}>
      <Grid item md={1} xs={4}>
          <div className={classes.label}>
            <Typography>
              <label className={classes.lab}>Tickets:</label>
            </Typography>
          </div>
        </Grid>


        <Grid item md={2} xs={6}>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Data</InputLabel>
          <Select className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={l_data}
            onChange={handleChangedata}
          >
            <MenuItem value={10}>23/12/29</MenuItem>
            <MenuItem value={20}>23/12/29</MenuItem>
            <MenuItem value={30}>23/12/29</MenuItem>
          </Select>
          </FormControl>
        </Grid> 

        <Grid item md={2} xs={6}>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={l_status}
            onChange={handleChangestatus}
          >
            <MenuItem value={10}>open</MenuItem>
            <MenuItem value={20}>close</MenuItem>
            <MenuItem value={30}>pending</MenuItem>
          </Select>
          </FormControl>
        </Grid> 

        <Grid item md={2} xs={6}>
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Solicitante</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={l_solicitante}
            onChange={handleChangesolicitante}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          </FormControl>
        </Grid> 

        </Grid>

        <Divider className={classes.divider} />
        <PerfectScrollbar>          
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
                  <TableCell className={classes.tableCell}>ID</TableCell>
                  <TableCell className={classes.tableCell}>Assunto</TableCell>
                  <TableCell className={classes.tableCell}>Solicitante</TableCell>
                  <TableCell className={classes.tableCell}>Data do Ticket</TableCell>
                  <TableCell className={classes.tableCell}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(0, rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}>
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
                        <Typography variant="body1">#{user.id}</Typography>
                      </div>
                    </TableCell>
                    <TableCell><a href=".dashboard">{user.subject}</a></TableCell>
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
