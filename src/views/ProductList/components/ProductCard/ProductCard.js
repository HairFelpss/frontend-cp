import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button,
  Tooltip
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  text: {
    paddingTop: '10px',
    height: '20%'
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2 /* number of lines to show */,
    '-webkit-box-orient': 'vertical'
  }
}));

const ProductCard = props => {
  const { className, product, open, handleOpen, handleClose, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.imageContainer}>
          <img alt="Product" className={classes.image} src={product.imageUrl} />
        </div>
        <div className={classes.text}>
          <Typography align="center" gutterBottom variant="h4">
            {product.title}
          </Typography>
          <Tooltip
            title={
              <Typography
                align="center"
                variant="body1"
                className={classes.tooltip}
              >
                {product.description}
              </Typography>
            }
          >
            <Typography
              className={classes.description}
              align="center"
              variant="body1"
            >
              {product.description}
            </Typography>
          </Tooltip>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Att a 2hr atrás
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(product)}
          >
            R${product.amount}
          </Button>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {product.totalDownloads}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
