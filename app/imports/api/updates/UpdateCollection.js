import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const updatePublications = {
  updateVolunteer: 'UpdateVolunteer',
  updateAdmin: 'UpdateAdmin',
};

export const collectionNames = ['user', 'report'];

class UpdateCollection extends BaseCollection {
  constructor() {
    super('Update', new SimpleSchema({
      date: Date,
      roles: {
        type: Array,
        defaultValue: ['admin'],
      },
      'roles.$': { type: String },
      collectionName: {
        type: String,
        allowedValues: collectionNames,
      },
      reportID: { // for modified reports
        type: String,
        optional: true,
      },
      userOwner: { // for newly created users
        type: String,
        optional: true,
      },
      updatedTypes: {
        type: Array,
      },
      'updatedTypes.$': { type: String },
      creator: {
        type: String,
        optional: true,
      }, // email of user who created the updated
    }));
  }

  define({ date, roles, collectionName, reportID, userOwner, updatedTypes, creator }) {
    const docID = this._collection.insert({
      date,
      roles,
      collectionName,
      reportID,
      userOwner,
      updatedTypes,
      creator,
    });
    return docID;
  }

  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;

      // if volunteer, only see updates that includes 'volunteer' in roles field array
      Meteor.publish(updatePublications.updateVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'volunteer')) {
          return instance._collection.find({ roles: ['admin', 'volunteer'] });
        }
        return this.ready();
      });

      // if admin, see all updates
      Meteor.publish(updatePublications.updateAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeUpdateVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(updatePublications.updateVolunteer);
    }
    return null;
  }

  subscribeUpdateAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(updatePublications.updateAdmin);
    }
    return null;
  }

  getAllUpdatesVolunteer() {
    return this._collection.find({ roles: ['admin', 'volunteer'] }, { sort: { date: -1 } }).fetch();
  }

  getAllUpdatesAdmin() {
    return this._collection.find({}, { sort: { date: -1 } }).fetch();
  }
}

export const Updates = new UpdateCollection();
