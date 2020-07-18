import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';
import { useTreasure } from '../../context/Treasure';

import Modal from '../../components/PaymentModal';
import Pagseguro from '../../components/PaymentButtons/Pagseguro';
import Picpay from '../../components/PaymentButtons/Picpay';
import Mercadopago from '../../components/PaymentButtons/Mercadopago';
import Paypal from '../../components/PaymentButtons/Paypal';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const {
    contextGetTreasures,
    contextUpdateTreasure,
    contextDeleteTreasure,
    treasures
  } = useTreasure();

  const [open, setOpen] = useState(false);
  const [currentTreasure, setCurrentTreasure] = useState({});
  const [selectedTreasure, setSelectedTreasure] = useState(null);

  const handleGetTreasures = async () => {
    await contextGetTreasures();
  };

  useEffect(() => {
    handleGetTreasures();
  }, []);

  const handleOpen = async treasure => {
    setCurrentTreasure(treasure);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectOne = (treasure, id) => {
    setCurrentTreasure(treasure);
    setSelectedTreasure(id);
  };

  return (
    <div className={classes.root}>
      <ProductsToolbar
        contextGetTreasures={contextGetTreasures}
        contextUpdateTreasure={contextUpdateTreasure}
        contextDeleteTreasure={contextDeleteTreasure}
        currentTreasure={currentTreasure}
        handleOpen={handleOpen}
        selectedTreasure={selectedTreasure}
        setCurrentTreasure={setCurrentTreasure}
      />
      <div className={classes.content}>
        <Grid container spacing={1}>
          {treasures.map(treasure => (
            <Grid item key={treasure.id} lg={4} md={6} xs={12}>
              <ProductCard
                treasure={treasure}
                open={open}
                handleOpen={handleOpen}
                handleSelectOne={handleSelectOne}
                selectedTreasure={selectedTreasure}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Modal open={open} handleClose={handleClose}>
        <Pagseguro treasure={currentTreasure} handleClose={handleClose} />
        <Mercadopago treasure={currentTreasure} handleClose={handleClose} />
        <Picpay treasure={currentTreasure} handleClose={handleClose} />
        <Paypal treasure={currentTreasure} handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default ProductList;
