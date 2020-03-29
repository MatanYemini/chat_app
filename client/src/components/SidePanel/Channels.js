import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

const Channels = props => {
  let [formData, setFormData] = useState({
    channels: [],
    channelName: '',
    channelDetails: '',
    modal: false
  });
  let { channels, channelName, channelDetails, modal } = formData;

  const closeModal = () => setFormData({ modal: false });
  const openModal = () => setFormData({ modal: true });

  const onChange = e => setFormData({ [e.target.name]: e.target.value });

  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name='exchange' /> CHANNELS{'    '}
          </span>
          ({channels ? channels.length : 0}){' '}
          <Icon name='add' onClick={openModal} />
        </Menu.Item>
        {/* Channels */}
      </Menu.Menu>
      {/* Channel Modals */}
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                fluid
                label='Name of Channel'
                name='channelName'
                onChange={e => onChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label='About the Channel'
                name='channelDetails'
                onChange={e => onChange(e)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Add
          </Button>
          <Button color='red' inverted onClick={closeModal}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

Channels.propTypes = {};

export default Channels;
