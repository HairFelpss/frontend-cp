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
  tableHeader: {
    backgroundColor: theme.palette.primary.main
  },
  tableCell: { color: theme.palette.text.primary, fontSize: 15 },
  inner: {
    minWidth: 1050
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
  description: {
    maxWidth: '3400px',
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
  },
  statusContainer: { textTransform: 'capitalize' },
  status: {
    marginRight: theme.spacing(1)
  },
  checkboxes: {
    display: 'none'
  }
}));

const StatementTable = props => {
  const { className, onClose, variant, open, statement, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

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
    1: 'info',
    0: 'warning',
    3: 'danger'
  };

  const status = {
    0: 'Pending',
    1: 'Confirmed',
    2: 'Develivered',
    3: 'Cancelled'
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar className={classes.scrollbar}>
          <div className={classes.inner}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    className={[classes.tableCell, classes.checkboxes]}
                  >
                    <Checkbox
                      checked={selectedUsers.length === statement.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < statement.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell className={classes.tableCell}>Data</TableCell>
                  <TableCell className={classes.tableCell}>Descrição</TableCell>
                  <TableCell className={classes.tableCell}>Valor</TableCell>
                  <TableCell className={classes.tableCell}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statement.slice(0, rowsPerPage).map(statement => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={statement.id}
                    selected={selectedUsers.indexOf(statement.id) !== -1}
                  >
                    <TableCell
                      padding="checkbox"
                      className={classes.checkboxes}
                    >
                      <Checkbox
                        checked={selectedUsers.indexOf(statement.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, statement.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">
                          {moment(statement.createdAt).format('DD/MM/YYYY')}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        className={classes.description}
                      >
                        {statement.description}
                      </Typography>
                    </TableCell>
                    <TableCell> R$ {statement.value}</TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[statement.status]}
                          size="sm"
                        />
                        {status[statement.status]}
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
          count={statement.length}
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

StatementTable.propTypes = {
  className: PropTypes.string,
  statement: PropTypes.array.isRequired
};

export default StatementTable;
