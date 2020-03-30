import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import UserPanel from './UserPanel';
import Channels from './Channels';

const SidePanel = props => {
  // Check Authentication
  return (
    <Menu
      size='large'
      inverted
      fixed='left'
      vertical
      style={{ background: '#4c3c4c', fontSize: '1.2rem' }}
    >
      <UserPanel />
      <Channels />
    </Menu>
  );
};

SidePanel.propTypes = {};

export default SidePanel;
