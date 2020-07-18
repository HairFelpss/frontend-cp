import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Radio,
  Typography,
  Grid,
  Divider,
  Button,
  Tooltip
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import 'moment/locale/pt-br';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    flexDirection: 'column', //this will allow flex-end to move item to the right
    justifyContent: 'center'
  },
  leftItem: {
    alignSelf: 'flex-start'
  },
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
  },
  date: {
    width: '11ch',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}));

const ProductCard = props => {
  const {
    className,
    treasure,
    open,
    handleOpen,
    handleSelectOne,
    selectedTreasure,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.content}>
          <Radio
            className={classes.leftItem}
            checked={selectedTreasure === treasure.id}
            color="primary"
            onChange={() => handleSelectOne(treasure, treasure.id)}
            value="true"
          />
          <div className={classes.imageContainer}>
            <img
              alt="Product"
              className={classes.image}
              src={treasure.image_url}
            />
          </div>
        </div>
        <div className={classes.text}>
          <Typography align="center" gutterBottom variant="h4">
            {treasure.title}
          </Typography>
          <Tooltip
            title={
              <Typography
                align="center"
                variant="body1"
                className={classes.tooltip}
              >
                {treasure.description}
              </Typography>
            }
          >
            <Typography
              className={classes.description}
              align="center"
              variant="body1"
            >
              {treasure.description}
            </Typography>
          </Tooltip>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <Tooltip
              title={
                <Typography
                  align="right"
                  variant="body1"
                  className={classes.tooltip}
                >
                  {moment(treasure.updated_at)
                    .locale('pt-br')
                    .subtract(2, 'days')
                    .calendar()}
                </Typography>
              }
            >
              <div className={classes.statsItem}>
                <AccessTimeIcon className={classes.statsIcon} />
                <Typography
                  display="inline"
                  variant="body2"
                  className={classes.date}
                >
                  {moment(treasure.updated_at)
                    .locale('pt-br')
                    .calendar()}
                </Typography>
              </div>
            </Tooltip>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(treasure)}
          >
            R${treasure.price}
          </Button>
          <Grid className={classes.statsItem} item>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Disponiveis: {treasure.qt_bought}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  treasure: PropTypes.object.isRequired
};

export default ProductCard;
