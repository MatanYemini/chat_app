import React from 'react';
import PropTypes from 'prop-types';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  MenuItem,
  Icon
} from 'semantic-ui-react';

const ColorPanel = props => {
  return (
    <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      veritcal='true'
      visible
      width='very thin'
    >
      <Divider />
      <Button color='blue' icon='add' size='small' />
    </Sidebar>
  );
};

ColorPanel.propTypes = {};

export default ColorPanel;
