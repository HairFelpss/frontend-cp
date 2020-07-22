import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  deleteButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.error.main
  },
  editButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.main
  }
}));

const ProductsToolbar = props => {
  const {
    className,
    contextGetTreasures,
    contextUpdateTreasure,
    contextDeleteTreasure,
    currentTreasure,
    setCurrentTreasure,
    handleOpen,
    selectedTreasure,
    handleSearchTreasures,
    ...rest
  } = props;

  const classes = useStyles();

  const handleUpdateTreasure = async () => {
    const response = await contextUpdateTreasure(
      selectedTreasure,
      currentTreasure
    );
    //handleEditOpen(true);
  };

  const handleDeleteTreasure = async () => {
    await contextDeleteTreasure(selectedTreasure);
    await contextGetTreasures();
    setCurrentTreasure({});
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          className={classes.deleteButton}
          onClick={() => handleDeleteTreasure()}
        >
          DELETE
        </Button>
        <Button
          className={classes.editButton}
          onClick={() => handleUpdateTreasure()}
        >
          EDIT
        </Button>
        <Button color="primary" variant="contained">
          Add product
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
          onChange={event => handleSearchTreasures(event.target.value)}
        />
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string
};

export default ProductsToolbar;
