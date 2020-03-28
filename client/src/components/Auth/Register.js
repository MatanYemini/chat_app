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
  let [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    errors: []
  });
  let { username, password, passwordConfirmation, errors } = formData;

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
    // errors = [];
    let error;

    if (isEmptyForm()) {
      error = { message: 'Fill all fields' };
      setFormData({ ...formData, [errors]: (errors[0] = error) });
      return false;
    } else if (!isPasswordValid()) {
      error = { message: 'Password is invalid' };
      setFormData({ ...formData, [errors]: (errors[0] = error) });
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
    setFormData({ ...formData, [errors]: delete errors[0] });
    e.preventDefault();

    if (password !== passwordConfirmation) {
      //setAlert('Password do not match', 'danger'); // instaed of using props (at top take props as argument and then props.setAlert)
      console.log('No match with passwords');
    } else {
      let msg = await register({ username, password });
      console.log(msg);
      if (msg) {
        let error = { message: msg };
        setFormData({ ...formData, [errors]: (errors[0] = error) });
      } else {
        setFormData({ ...formData, [errors]: (errors = []) });
      }
    }
  };

  let displayErrors = errors => {
    if (errors.length > 0) {
      return errors.map((error, i) => <p key={i}>{error.message}</p>);
    } else {
      return null;
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
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors(errors)}
          </Message>
        )}
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
