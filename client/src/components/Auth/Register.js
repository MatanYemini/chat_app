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

// Alerts
import { useAlert } from 'react-alert';

const Register = ({ register, isAuthenticated }) => {
  let [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  });
  const alert = useAlert();

  let { username, password, passwordConfirmation } = formData;

  const isEmptyForm = () => {
    return !username.length || !password.length || !passwordConfirmation.length;
  };

  const isPasswordValid = () => {
    if (password.length < 6 || passwordConfirmation < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const isFormValid = () => {
    if (isEmptyForm()) {
      alert.error('Fill all fields');
      return false;
    } else if (!isPasswordValid()) {
      alert.error('Password is invalid');
      return false;
    } else if (username.length < 3) {
      alert.error('Username Not Valid - at least 3 characters');
      return false;
    }
    return true;
  };
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    if (!isFormValid()) {
      return;
    }
    e.preventDefault();

    let msg = await register({ username, password });
    console.log(msg);
    if (msg) {
      let error = { message: msg };
      alert.error(msg);
    } else {
      alert.success('User Registered!');
    }
  };

  // Redirect if logged in
  //   if (isAuthenticated) {
  //     return <Redirect to='/' />;
  //   }

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
