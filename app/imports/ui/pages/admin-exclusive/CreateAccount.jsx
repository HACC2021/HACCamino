import React, { useState } from 'react';
import { Container, Form, Grid, Header } from 'semantic-ui-react';

const roleOptions = [
  { key: 'a', text: 'Admin', value: 'admin' },
  { key: 'v', text: 'Volunteer', value: 'volunteer' },
];

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

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
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(role);
  };

  return (
    <Container>
      <Grid container centered>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" content={'Create New User Account'}/>
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
      </Grid>
    </Container>
  );
};

export default CreateAccount;
