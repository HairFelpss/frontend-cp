import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useLocation, Redirect } from 'react-router-dom';

import { ChatToolbar, ChatScreen } from './components';
import { useAuth } from '../../context/Auth';

import { getMessages, postMessage } from '../../services/api/messages';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Chat = () => {
  const classes = useStyles();

  const location = useLocation();
  const { storageUserId } = useAuth();
  const [messages, setMessages] = useState([]);
  const [storageChatId, setStorageChatId] = useState('');
  const [text, setText] = useState('');

  const handleGetMessages = async () => {
    const id = localStorage.getItem('chatId');
    setStorageChatId(id);
    setMessages(await getMessages(id));
  };

  const handlePostMessage = async text => {
    const payload = {
      content: text,
      cp_ticket_id: storageChatId,
      writer_id: storageUserId
    };
    setText('');

    await postMessage(payload);
    handleGetMessages();
  };

  const handleSetText = event => {
    event.persist();
    setText(event.target.value);
  };

  useEffect(() => {
    handleGetMessages();
  }, []);

  return (
    <div className={classes.root}>
      <ChatToolbar />
      <div className={classes.content}>
        <ChatScreen
          messages={messages}
          handlePostMessage={handlePostMessage}
          setText={setText}
          text={text}
          handleSetText={handleSetText}
        />
      </div>
    </div>
  );
};

export default Chat;