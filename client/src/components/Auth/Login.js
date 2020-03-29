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
import { login } from '../../actions/auth';

// Alerts
import { useAlert } from 'react-alert';

const Login = ({ login, isAuthenticated }) => {
  let [formData, setFormData] = useState({
    username: '',
    password: '',
    loading: false
  });
  const alert = useAlert();

  let { username, password, loading } = formData;

  const isEmptyForm = () => {
    return !username.length || !password.length;
  };

  const isFormValid = () => {
    if (isEmptyForm()) {
      alert.error('Fill all fields');
      return false;
    } else if (password.length < 6) {
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
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    setFormData({ ...formData, loading: true });
    let msg = await login({ username, password });
    if (msg) {
      alert.error(msg);
    } else {
      alert.success('User Logged In!');
    }
    setFormData({ ...formData, loading: false });
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Grid textAlign='center' verticalAlign='middle' className='app'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' icon color='violet' textAlign='center'>
          <Icon name='code branch' color='orange' />
          Login to DevChat
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

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color='violet'
              fluid
              size='large'
            >
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an Account? <Link to='/register'> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
