import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Sidebar } from 'semantic-ui-react';

const UserPanel = props => {
  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          <Header inverted floated='left' as='h2'>
            <Icon name='code'></Icon>
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

UserPanel.propTypes = {};

export default UserPanel;
