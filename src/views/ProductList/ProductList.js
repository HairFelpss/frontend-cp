import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';

import Modal from '../../components/PaymentModal';
import Pagseguro from '../../components/PaymentButtons/Pagseguro';
import Picpay from '../../components/PaymentButtons/Picpay';
import Mercadopago from '../../components/PaymentButtons/Mercadopago';
import Paypal from '../../components/PaymentButtons/Paypal';

import box from './data';

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

  const [open, setOpen] = useState(false);
  const [defaultBox] = useState(box);
  const [currentBox, setCurrentBox] = useState({});

  const handleOpen = async box => {
    setCurrentBox(box);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid container spacing={1}>
          {defaultBox.map(product => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <ProductCard
                product={product}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
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
        <Pagseguro box={currentBox} handleClose={handleClose} />
        <Mercadopago box={currentBox} handleClose={handleClose} />
        <Picpay box={currentBox} handleClose={handleClose} />
        <Paypal box={currentBox} handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default ProductList;
