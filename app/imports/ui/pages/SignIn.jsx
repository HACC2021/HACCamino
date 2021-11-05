import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Swal from 'sweetalert2';
import { setNewPassword, userSetActiveStatus } from '../../api/user/UserCollection.methods';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [disableEmail, setDisableEmail] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useHistory();
  const goToPage = (pageLink) => {
    history.push(pageLink);
  };

  const handleChange = (e, { name, value }) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordAgain') {
      setPasswordAgain(value);
    }
  };

  const handleSubmit = () => {
    if (isSubmit && page === 0) { // to check if password exists
      setIsSubmit(false);
      Meteor.loginWithPassword(email, password, (err => {
        if (err.reason === 'User has no password set') {
          setError('');
          setPage(1);
        } else if (err.reason === 'Incorrect password') {
          setError('');
          setPage(2);
        } else {
          setError(err.reason);
        }
      }));
    } else if (isSubmit && page === 1) {
      setIsSubmit(false);
      if (password !== passwordAgain) {
        setError('Passwords do not match, please retype.');
      } else {
        setNewPassword.call({ email, password },
          (err) => {
          if (err) {
            setError(err.message);
          } else {
            Swal.fire('Password has been set!',
              'Please log in using your new password.',
              'success').then(() => history.go(0));
          }
        });
      }
    } else if (isSubmit && page === 2) {
      setIsSubmit(false);
      Meteor.loginWithPassword(email, password, (err => {
        if (err) {
          setError(err.reason);
        } else {
          const currentUser = Meteor.user()?.username;
          userSetActiveStatus.call({ owner: currentUser, active: true }, (err2 => {
            if (err2) {
              setError(err2.reason);
            } else {
              Swal.fire('Log in successful',
                '',
                'success').then(() => {
                setError('');
                goToPage('/dashboard');
              });
            }
          }));
        }
      }));
    } else if (!isSubmit) {
      setPage(0);
      setError('');
    }
  };

  useEffect(() => {
    if (page === 0) { // reset everything except email
      setDisableEmail(false);
      setShowNewPassword(false);
      setShowPassword(false);
      setShowNext(true);
      setPassword('');
      setPasswordAgain('');
    } else if (page === 1) {
      setDisableEmail(true);
      setShowNewPassword(true);
      setShowPassword(true);
      setShowNext(false);
    } else if (page === 2) {
      setDisableEmail(true);
      setShowNewPassword(false);
      setShowPassword(true);
      setShowNext(false);
    }

    if (error !== '') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [page, error]);

  const nextButton = (
    <Form.Button animated onClick={() => setIsSubmit(true)}>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right'/>
      </Button.Content>
    </Form.Button>
  );

  const submitButton = (
    <Form.Group inline>
      <Form.Button animated>
        <Button.Content visible>Back</Button.Content>
        <Button.Content hidden>
          <Icon name='arrow left'/>
        </Button.Content>
      </Form.Button>
      <Form.Button content='Submit' onClick={() => setIsSubmit(true)}/>
    </Form.Group>
  );

  const passwordForm = (
    <Form.Input
      icon='lock'
      iconPosition='left'
      type='password'
      label='Password'
      placeholder='Password'
      name='password'
      value={password}
      onChange={handleChange}
    />
  );

  const newPasswordForm = (
    <Form.Input
      icon='lock'
      iconPosition='left'
      type='password'
      label='Re-type Password'
      placeholder='Re-type Password'
      name='passwordAgain'
      value={passwordAgain}
      onChange={handleChange}
    />
  );

  return (
    <Container>
      <Grid container centered>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" content={'Volunteer/Admin Sign In'}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                required
                icon='mail'
                iconPosition='left'
                type='email'
                label='Email'
                placeholder='Email'
                name='email'
                value={email}
                readOnly={disableEmail}
                onChange={handleChange}
              />
              {showPassword ? passwordForm : null}
              {showNewPassword ? newPasswordForm : null}
              {showNext ? nextButton : submitButton}
            </Form>
          </Grid.Column>
        </Grid.Row>

        {showMessage ?
          <Grid.Row>
            <Grid.Column>
              <Message
                error
                header="Login was not successful"
                content={error}
              />
            </Grid.Column>
          </Grid.Row>
          : null
        }
      </Grid>
    </Container>
  );
};

export default SignIn;
