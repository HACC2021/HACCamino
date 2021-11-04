import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [showNext, setShowNext] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/dashboard';
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
    if (page === 0) {
      Meteor.loginWithPassword(email, password, (err => {
        if (err.reason === 'User has no password set') {
          setPage(1);
          setError('');
        } else if (err.reason === 'Incorrect password') {
          setPage(2);
          setError('');
        } else {
          setError(err.reason);
        }
      }));
    } else if ([1, 2].includes(page)) {
      Meteor.loginWithPassword(email, password, (err => {
        if (err) {
          setError(err.reason);
        } else {
          setError('');
          goToPage();
        }
      }));
    }
  };

  useEffect(() => {
    if (page === 1) {
      setShowNewPassword(true);
      setShowPassword(true);
      setShowNext(false);
    } else if (page === 2) {
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
    <Form.Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name='arrow right'/>
      </Button.Content>
    </Form.Button>
  );

  const submitButton = (
    <Form.Button content='Submit'/>
  );

  const passwordForm = (
    <Form.Input
      required
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
      required
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
