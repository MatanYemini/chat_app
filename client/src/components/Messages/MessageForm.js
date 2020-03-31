import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Input } from 'semantic-ui-react';
import '../../App.css';

const MessageForm = props => {
  return (
    <Segment className='messages__form'>
      <Input
        fluid
        name='message'
        style={{ marginBottom: '0.7em' }}
        label={<Button icon={'add'} />}
        labelPosition='left'
        placeholder='Write your message'
      />
      <Button.Group icon widths='2'>
        <Button
          color='orange'
          content='Add Reply'
          labelPosition='left'
          icon='edit'
        />
        <Button
          color='teal'
          content='Upload Media'
          labelPosition='right'
          icon='cloud upload'
        />
      </Button.Group>
    </Segment>
  );
};

MessageForm.propTypes = {};

export default MessageForm;
