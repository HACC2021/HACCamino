import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { Updates } from '../updates/UpdateCollection';

export const reportPublications = {
  reportAdminVolunteer: 'ReportAdminVolunteer',
};

class ReportCollection extends BaseCollection {
  constructor() {
    super('Report', new SimpleSchema({
      name: {
        type: Array,
        defaultValue: [],
      },
      'name.$': { type: String },
      date: {
        type: Array,
        defaultValue: [],
      },
      'date.$': { type: String },
      accessKey: {
        type: Array,
        defaultValue: [],
      },
      'accessKey.$': { type: String },
      island: String,
      location: String,
      animal: String,
      animalCharacteristics: {
        type: Array,
        defaultValue: [],
      },
      'animalCharacteristics.$': { type: String },
      animalBehavior: {
        type: Array,
        defaultValue: [],
      },
      'animalBehavior.$': { type: String },
      lat: Number,
      lng: Number,
      people: {
        type: Array,
        defaultValue: [],
      },
      'people.$': { type: String },
      phoneNumber: {
        type: Array,
        defaultValue: [],
      },
      'phoneNumber.$': { type: String },
      notes: {
        type: Array,
        defaultValue: [],
      },
      'notes.$': { type: String },
      link: String,
      status: String,
    }));
  }

  define({ name, date, accessKey, animal,
           location, animalCharacteristics, lat, lng,
           people, phoneNumber, notes, animalBehavior, link, status, island, creator }) {
    // add duplicate verifier here, create a new method/function if you have to
    const docID = this._collection.insert({
      name,
      date,
      accessKey,
      location,
      animalCharacteristics,
      lat,
      lng,
      people,
      phoneNumber,
      notes,
      animalBehavior,
      link,
      status,
      animal,
      island,
    });

    Updates.define({
      date: new Date(),
      roles: ['admin', 'volunteer'],
      collectionName: 'report',
      reportID: docID,
      updatedTypes: ['createReport'],
      creator: creator || 'general-public',
    });
    return docID;
  }

  update(docID, { name, accessKey, animal, date, link,
    location, animalCharacteristics, people, phoneNumber, notes, animalBehavior, status, island }) {
    const updateData = {};

    if (name) {
      updateData.name = name;
    }
    if (date) {
      updateData.date = date;
    }
    if (animalBehavior) {
      updateData.animalBehavior = animalBehavior;
    }
    if (link) {
      updateData.link = link;
    }
    if (accessKey) {
      updateData.accessKey = accessKey;
    }
    if (location) {
      updateData.location = location;
    }
    if (people) {
      updateData.people = people;
    }
    if (phoneNumber) {
      updateData.phoneNumber = phoneNumber;
    }
    if (animalCharacteristics) {
      updateData.animalCharacteristics = animalCharacteristics;
    }
    if (notes) {
      updateData.notes = notes;
    }
    if (status) {
      updateData.status = status;
    }
    if (animal) {
      updateData.animal = animal;
    }
    if (island) {
      updateData.island = island;
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
      Meteor.publish(reportPublications.reportAdminVolunteer, function publish() {
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

  getPendingReports() {
    const reports = this.getCurrentReports();
    return reports.filter(report => report.status === 'pending');
  }

  getApprovedReports() {
    const reports = this.getCurrentReports();
    return reports.filter(report => report.status === 'approved');
  }

  getSealReports() {
    const reports = this.getCurrentReports();
    return reports.filter(report => report.animal === 'Hawaiian Monk Seal');
  }

  getTurtleReports() {
    const reports = this.getCurrentReports();
    return reports.filter(report => report.animal === 'Sea Turtles');
  }

  getBirdReports() {
    const reports = this.getCurrentReports();
    return reports.filter(report => report.animal === 'Sea Birds');
  }

  getRelatedReports(userReport) {
    let reports = ' ';
    if (userReport.animal === 'Hawaiian Monk Seal') {
      reports = this.getSealReports();
    } else if (userReport.animal === 'Sea Turtles') {
      reports = this.getTurtleReports();
    } else {
      reports = this.getBirdReports();
    }
    reports = reports.filter(report => report._id !== userReport._id);
    const minLat = userReport.lat - 0.015;
    const maxLat = userReport.lat + 0.015;
    const minLng = userReport.lng - 0.015;
    const maxLng = userReport.lng + 0.015;
    return reports.filter(report => (report.lat >= minLat && report.lat <= maxLat)
    && (report.lng >= minLng && report.lng <= maxLng) && (report._id !== userReport._id));
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Reports = new ReportCollection();
