import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import 'moment/locale/pt-br';

import { useTreasure } from '../../../../context/Treasure';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
    overflow: 'auto',
    maxHeight: 385
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestProducts = props => {
  const { className, ...rest } = props;
  const { treasures, contextGetTreasures } = useTreasure();

  useEffect(() => {
    contextGetTreasures();
  }, []);
  const classes = useStyles();
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        subtitle={`${treasures.length} in total`}
        title="Latest products"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {treasures.map((treasure, i) => (
            <ListItem divider={i < treasures.length - 1} key={treasure.id}>
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={treasure.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={treasure.name}
                secondary={`Updated ${moment(treasure.updated_at)
                  .locale('pt-br')
                  .calendar()}`}
              />
              <IconButton edge="end" size="small">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
