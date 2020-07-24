import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import uuid from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

import { getInitials } from '../../../../helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  filter: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    marginLeft: '1%'
  },
  actions: {
    marginTop: '1%'
  },
  list: {
    minHeight: '50vh',
    maxHeight: '60vh'
  },
  avatar: {
    marginRight: theme.spacing(1)
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

const ChatScreen = props => {
  const {
    className,
    messages,
    handlePostMessage,
    text,
    setText,
    handleSetText,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <Typography variant="h6">
            Esperamos te atender da melhor forma possivel!
          </Typography>
        }
      />

      <Divider />
      <CardContent>
        <PerfectScrollbar className={classes.scrollbar}>
          <List className={classes.list}>
            {messages.map((message, index, arr) => (
              <div key={uuid()}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      {getInitials(message.writer.name)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        {message.writer.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {message.content}
                        </Typography>
                        {' - '}
                        {moment(message.created_at)
                          .locale('pt-br')
                          .calendar()}
                      </>
                    }
                  />
                </ListItem>
                {arr.length - 1 !== index ? (
                  <Divider variant="inset" component="li" light />
                ) : null}
              </div>
            ))}
          </List>
        </PerfectScrollbar>
      </CardContent>
      <Divider />

      <CardActions className={classes.actions}>
        <TextField
          value={text || ''}
          id="outlined-multiline-static"
          multiline
          fullWidth
          onChange={handleSetText}
          variant="outlined"
        />
        <Button
          variant="outlined"
          className={classes.filter}
          onClick={() => handlePostMessage(text)}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};

ChatScreen.propTypes = {
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
};

export default ChatScreen;
