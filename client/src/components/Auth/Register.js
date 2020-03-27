import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/user';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const { username, password, passwordConfirmation } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      //setAlert('Password do not match', 'danger'); // instaed of using props (at top take props as argument and then props.setAlert)
      console.log('No match with passwords');
    } else {
      register({ username, password });
      console.log('SUCCESS');
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='orange' textAlign='center'>
          <Icon name='rocketchat' color='orange' />
          Register for DevChat
        </Header>
        <Form onSubmit={e => onSubmit(e)} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              onChange={e => onChange(e)}
              value={username}
              type='text'
            />

            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              onChange={e => onChange(e)}
              value={password}
              type='password'
            />

            <Form.Input
              fluid
              name='passwordConfirmation'
              icon='repeat'
              iconPosition='left'
              placeholder='Password Confirmation'
              onChange={e => onChange(e)}
              value={passwordConfirmation}
              type='password'
            />

            <Button color='orange' fluid size='large'>
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
