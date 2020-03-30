import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
// Alerts
import { useAlert } from 'react-alert';

const Channels = props => {
  let [formData, setFormData] = useState({
    channels: [],
    channelName: '',
    channelDetails: '',
    modal: false
  });
  const alert = useAlert();
  let { channels, channelName, channelDetails, modal } = formData;

  const isformValid = () => {
    if (channelName.length < 3) {
      alert.error('Not Valid Channel Name');
      return false;
    } else if (channelDetails.length < 4) {
      alert.error('Not Valid Channel Details');
      return false;
    }
    return true;
  };

  const closeModal = () => setFormData({ modal: false });
  const openModal = () => setFormData({ modal: true });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (channelName && channelDetails) {
      if (!isformValid()) {
        return;
      }
      console.log('added channel');
    }
  };

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
          <Form onSubmit={e => onSubmit(e)}>
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
          <Button color='green' inverted onClick={e => onSubmit(e)}>
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
