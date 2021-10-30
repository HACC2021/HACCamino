import { Meteor } from 'meteor/meteor';
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
    Meteor.settings.defaultUsers.map(user => Users.define(user));
  }
}
