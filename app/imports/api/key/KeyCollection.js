import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const keyPublications = {
  keyAdmin: 'KeyAdmin',
};

class KeyCollection extends BaseCollection {
  constructor() {
    super('Key', new SimpleSchema({
      name: String,
      key: String,
    }));
  }

  define({ name, key }) {
    const docID = this._collection.insert({
      name,
      key,
    });
    return docID;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(keyPublications.keyAdmin, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeKeyAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(keyPublications.keyAdmin);
    }
    return null;
  }

  getKey(type) {
    return this._collection.find({}, { name: type }).fetch();
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Keys = new KeyCollection();
