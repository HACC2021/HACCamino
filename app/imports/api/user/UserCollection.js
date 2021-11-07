import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { Updates } from '../updates/UpdateCollection';

export const userPublications = {
  userVolunteer: 'UserVolunteer',
  userAdmin: 'UserAdmin',
};

class UserCollection extends BaseCollection {
  constructor() {
    super('User', new SimpleSchema({
      firstName: String,
      lastName: String,
      owner: String,
      photoAWSKey: {
        type: String,
        optional: true,
        defaultValue: 'default-photo.png',
      },
      active: {
        type: Boolean,
        defaultValue: false,
      },
      role: {
        type: String,
        allowedValues: ['admin', 'volunteer'],
      },
    }));
  }

  define({ firstName, lastName, owner, photoAWSKey, active, role, creator }) {
    const docID = this._collection.insert({
      firstName,
      lastName,
      owner,
      photoAWSKey,
      active,
      role,
    });

    Updates.define({
      date: new Date(),
      roles: ['admin'],
      collectionName: 'user',
      userOwner: owner,
      updatedTypes: ['createUser'],
      creator: creator || 'hacccamino@gmail.com',
    });
    return docID;
  }

  update(docID, { firstName, lastName, photoAWSKey }) {
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (photoAWSKey) {
      updateData.photoAWSKey = photoAWSKey;
    }
    this._collection.update(docID, { $set: updateData });
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

      // if volunteer, only see their own user data
      Meteor.publish(userPublications.userVolunteer, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'volunteer')) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      // if admin, ability to see everyone's data
      Meteor.publish(userPublications.userAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeUserVolunteer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userVolunteer);
    }
    return null;
  }

  subscribeUserAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userPublications.userAdmin);
    }
    return null;
  }

  getAllUsers() {
    return this._collection.find({}, { sort: { lastName: 1 } }).fetch();
  }

  getUserVolunteers() {
    return this._collection.find({ role: 'volunteer' }, { sort: { lastName: 1 } }).fetch();
  }

  getUserAdmins() {
    return this._collection.find({ role: 'admin' }, { sort: { lastName: 1 } }).fetch();
  }

  getUserDetailFromID(userID) {
    return this._collection.findOne({ _id: userID });
  }

  getUserDetailFromEmail(userEmail) {
    return this._collection.findOne({ owner: userEmail });
  }

  setActiveStatus({ owner, active }) {
    const docID = this.getUserDetailFromEmail(owner)._id;
    const updateData = {};
    if (typeof (active) === 'boolean') {
      updateData.active = active;
    }
    this._collection.update(docID, { $set: updateData });
  }
}

export const Users = new UserCollection();
