import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
// Alerts
import { useAlert } from 'react-alert';
// Redux
import { getUserChannels, addChannel } from '../../actions/channel';
import { setCurrentChannel } from '../../actions/channel';
import { connect } from 'react-redux';

const Channels = ({ addChannel, getUserChannels, setCurrentChannel }) => {
  let [formData, setFormData] = useState({
    channels: [],
    title: '',
    details: '',
    modal: false,
    activeChannel: ''
  });
  const alert = useAlert();

  useEffect(() => {
    loadUserChannels();
  }, []);

  let { channels, title, details, modal, activeChannel } = formData;

  const loadUserChannels = async () => {
    setFormData({ channels: await getUserChannels() });
  };

  const isformValid = () => {
    if (title.length < 3) {
      alert.error('Not Valid Channel Name');
      return false;
    } else if (details.length < 5) {
      alert.error('Not Valid Channel Details');
      return false;
    }
    return true;
  };

  const displayChannels = () =>
    channels &&
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel._id}
        onClick={() => changeChannel(channel)}
        name={title}
        style={{ opacity: 0.7 }}
        active={channel._id === activeChannel}
      >
        # {channel.title}
      </Menu.Item>
    ));

  const changeChannel = channel => {
    setCurrentChannel(channel);
    setFormData({ ...formData, activeChannel: channel._id });
  };

  const closeModal = () => {
    setFormData({ modal: false });
    loadUserChannels();
  };
  const openModal = () => setFormData({ modal: true });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (title && details) {
      if (!isformValid()) {
        return;
      }
      let msg = await addChannel({ title, details });
      if (msg) {
        alert.error(msg);
      } else {
        closeModal();
        alert.success('Channel Added!');
      }
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
        {displayChannels()}
      </Menu.Menu>
      {/* Channel Modals */}
      <Modal
        basic
        open={modal}
        closeOnDimmerClick={true}
        closeOnEscape
        onClose={closeModal}
      >
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Field>
              <Input
                fluid
                label='Name of Channel'
                name='title'
                onChange={e => onChange(e)}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label='About the Channel'
                name='details'
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

Channels.propTypes = {
  addChannel: PropTypes.func.isRequired,
  getUserChannels: PropTypes.func.isRequired
};

export default connect(null, {
  addChannel,
  getUserChannels,
  setCurrentChannel
})(Channels);
