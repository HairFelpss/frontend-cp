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

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
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
  subject: {
    maxWidth: '400px',
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

const ExtractTable = props => {
  const { className, onClose, variant, open, users, ...rest } = props;

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

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
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
                  <TableCell className={classes.tableCell}>Data</TableCell>
                  <TableCell className={classes.tableCell}>Assunto</TableCell>
                  <TableCell className={classes.tableCell}>Categoria</TableCell>
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
                        <Typography variant="body1">{moment(user.createdAt).format('DD/MM/YYYY')}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" className={classes.subject}>
                        {user.subject}
                      </Typography>
                    </TableCell>
                    <TableCell> {user.category}</TableCell>  
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

ExtractTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default ExtractTable;
