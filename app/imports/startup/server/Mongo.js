import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Reports } from '../../api/report/ReportCollection';
import { Users } from '../../api/user/UserCollection';

/* eslint-disable no-console */

/** Initialize the collection if empty. */
if (Reports.count() === 0) {
  if (Meteor.settings.defaultReport) {
    console.log('Creating default report.');
    Meteor.settings.defaultReport.map(report => Reports.define(report));
  }
}

if (Users.count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Create default users.');
    const volunteerEmails = Roles.getUsersInRole(['volunteer'])
      .fetch()
      .map(volunteer => volunteer.username);
    const adminEmails = Roles.getUsersInRole(['admin'])
      .fetch()
      .map(admin => admin.username);

    Meteor.settings.defaultUsers.forEach(user => {
      const definitionData = {};
      let role;
      if (volunteerEmails.includes(user.owner)) {
        role = 'volunteer';
      } else if (adminEmails.includes(user.owner)) {
        role = 'admin';
      }

      if (role) {
        definitionData.firstName = user.firstName;
        definitionData.lastName = user.lastName;
        definitionData.owner = user.owner;
        definitionData.photoAWSKey = user.photoAWSKey;
        definitionData.role = role;
        Users.define(definitionData);
      }
    });
  }
}
