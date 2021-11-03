import React, { useState, useEffect } from 'react';
import { Container, Form, Grid, Header, Message } from 'semantic-ui-react';
import faker from 'faker';
import { useHistory } from 'react-router-dom';
import { defineAccountRoleUser } from '../../../api/user/UserCollection.methods';

const roleOptions = [
  { key: 'a', text: 'Admin', value: 'admin' },
  { key: 'v', text: 'Volunteer', value: 'volunteer' },
];

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const history = useHistory();
  const goToPage = (result) => {
    const pageLink = 'success';
    history.push({
      pathname: pageLink,
      state: {
        userID: result.userID,
        accountID: result.accountID,
        password: result.password,
      },
    });
  };

  const handleChange = (e, { name, value }) => {
    if (name === 'firstName') {
      setFirstName(value);
    } else if (name === 'lastName') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'role') {
      setRole(value);
    }
  };

  const handleSubmit = () => {
    const tempPassword = faker.internet.password();
    const definitionData = {};
    definitionData.firstName = firstName;
    definitionData.lastName = lastName;
    definitionData.owner = email;
    definitionData.role = role;
    defineAccountRoleUser.call({ email, password: tempPassword, role, definitionData },
      (err, result) => {
        if (err) {
          setError(err.message);
        } else {
          setError('');
          goToPage(result);
        }
      });
  };

  useEffect(() => {
    if (error !== '') {
      setShowMessage(true);
    }
  }, [error]);

  return (
    <Container>
      <Grid container centered>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" content={'Create User Account'}/>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Select
                required
                label='Role'
                placeholder='Role'
                name='role'
                options={roleOptions}
                onChange={handleChange}
              />
              <Form.Input
                required
                label='First Name'
                placeholder='First Name'
                name='firstName'
                value={firstName}
                onChange={handleChange}
              />
              <Form.Input
                required
                label='Last Name'
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={handleChange}
              />
              <Form.Input
                required
                type='email'
                label='Email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={handleChange}
              />
              <Form.Button content="Submit"/>
            </Form>
          </Grid.Column>
        </Grid.Row>

        {showMessage ?
          <Grid.Row>
            <Grid.Column>
              <Message
                error
                header="Account creation unsuccessful"
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

export default CreateAccount;
