import { Meteor } from 'meteor/meteor';
import { Reports } from '../../api/report/ReportCollection';
import { Users } from '../../api/user/UserCollection';
import { Keys } from '../../api/key/KeyCollection';
import { Updates } from '../../api/updates/UpdateCollection';

/** Publish all the collections you need. */
const collections = [
  Reports,
  Users,
  Keys,
  Updates,
];

collections.forEach(collection => collection.publish());

/** Need this for the alanning:roles package */
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
