import React, { useState, useEffect } from 'react';
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';
import { defineAccountRoleUser } from '../../../api/user/UserCollection.methods';
import UploadPhotoModal from '../../components/aws/UploadPhotoModal';

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
  // aws hosting
  const [data, setData] = useState([]);
  const handleCallback = (childData) => {
    setData(arr => [...arr, childData]);
  };

  const history = useHistory();
  const goToPage = (pageLink) => {
    history.push(pageLink);
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
    const definitionData = {};
    definitionData.firstName = firstName;
    definitionData.lastName = lastName;
    definitionData.owner = email;
    definitionData.role = role;
    definitionData.creator = Meteor.user().username;
    definitionData.photoAWSKey = (data.length === 0 ? 'default-photo.png' : data[0][0]);
    defineAccountRoleUser.call({ email, role, definitionData },
      (err) => {
        if (err) {
          setError(err.message);
        } else {
          setError('');
          Swal.fire('You have successfully created an account!',
            `An e-mail, containing a link the new ${role} can use to set their
            new password has been sent to <strong>${email}</strong>.
            <br/>
            <br/>
            <small>
              The app is still being developed.
            <br/>
              The functionality to send e-mails has not been implemented.
            </small>`,
            'success').then(() => {
              if (role === 'admin') {
                goToPage('/admin/staff-list');
              } else {
                goToPage('/admin/volunteers-list');
              }
          });
        }
      });
  };

  useEffect(() => {
    if (error !== '') {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [error]);

  return (
    <Grid container centered>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" textAlign="center" content={'Create User Account'}/>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Form>
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
            <Form.Field>
              <label>Upload ID Photo</label>
              <UploadPhotoModal parentCallback={handleCallback}/>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Button content="Submit" onClick={handleSubmit}/>
        </Grid.Column>
      </Grid.Row>

      {showMessage ?
        <Grid.Row>
          <Grid.Column>
            <Message
              error
              header="Account creation was not successful"
              content={error}
            />
          </Grid.Column>
        </Grid.Row>
        : null
      }
    </Grid>
  );
};

export default CreateAccount;
