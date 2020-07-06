import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';
import handlePagSeguro from '../../services/api/pagseguro';
import handleMercadoPago from '../../services/api/mercadopago';

import Modal from '../../components/PaymentModal';
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
  const [products] = useState(box);
  const [buyBox, setBuyBox] = useState({});

  const handleOpen = async box => {
    const pagseguro = await handlePagSeguro(box);
    const mercadopago = await handleMercadoPago(box);
    setBuyBox({ pagseguro: pagseguro.boxInfo.code, mercadopago: mercadopago });
    console.log(mercadopago);
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
          {products.map(product => (
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
      <Modal open={open} handleClose={handleClose} box={buyBox} />
    </div>
  );
};

export default ProductList;
