import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Avatar from 'react-avatar';

const UserPanel = ({ logout, user, isAuthenticated }) => {
  const dropDownOptions = () => [
    {
      key: 'user',
      text: (
        <span>
          Signed In as <strong>{user.username}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: 'signout',
      text: <span onClick={logout}>Sign Out</span>
    }
  ];

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Grid style={{ background: '#4c3c4c' }}>
      <Grid.Column>
        <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
          <Header inverted floated='left' as='h2'>
            {/* App Header */}
            <Icon name='code'></Icon>
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        {/* User Dropdown */}
        <Header style={{ padding: '0.25em' }} as='h4' inverted>
          <Dropdown
            trigger={
              <span>
                <Avatar name={user.username} size='35' round={true} />
                {'  '}
                {user.username}
              </span>
            }
            options={dropDownOptions()}
          />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

UserPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(UserPanel);
