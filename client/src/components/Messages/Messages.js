import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment, Comment } from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import '../../App.css';

const Messages = props => {
  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className='messages'>{/* Messages */}</Comment.Group>
      </Segment>
      <MessageForm />
    </Fragment>
  );
};

Messages.propTypes = {};

export default Messages;
