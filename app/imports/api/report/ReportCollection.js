import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

export const reportPublications = {
  reportAdminVolunteer: 'ReportAdminVolunteer',
};

class ReportCollection extends BaseCollection {
  constructor() {
    super('Report', new SimpleSchema({
      title: String,
      name: String,
      date: Date,
      accessKey: String,
      location: String,
      characteristics: String,
      animalBehavior: String,
      lat: Number,
      lng: Number,
      people: Number,
      phone: String,
      notes: {
        type: String,
        optional: true,
      },
      link: String,
    }));
  }

  define({ title, name, date, accessKey, location, characteristics, lat, lng, people, phone, notes, animalBehavior, link }) {
    // add duplicate verifier here, create a new method/function if you have to
    const docID = this._collection.insert({
      title,
      name,
      date,
      accessKey,
      location,
      characteristics,
      lat,
      lng,
      people,
      phone,
      notes,
      animalBehavior,
      link,
    });
    return docID;
  }

  update(docID, { title, name, accessKey, location, characteristics, people, phone, notes, animalBehavior }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (name) {
      updateData.name = name;
    }
    if (animalBehavior) {
      updateData.animalBehavior = animalBehavior;
    }
    if (accessKey) {
      updateData.accessKey = accessKey;
    }
    if (location) {
      updateData.location = location;
    }
    if (_.isNumber(people)) {
      updateData.people = people;
    }
    if (phone) {
      updateData.phone = phone;
    }
    if (characteristics) {
      updateData.characteristics = characteristics;
    }
    if (notes) {
      updateData.notes = notes;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the report associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ReportCollection instance.
      const instance = this;

      // only publish reports when logged in.
      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(reportPublications.reportAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ['admin', 'volunteer'])) {
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
  subscribeReportAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reportPublications.reportAdminVolunteer);
    }
    return null;
  }

  getCurrentReports() {
    return this._collection.find({}, { sort: { date: 1 } }).fetch();
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Reports = new ReportCollection();
