import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Reports } from './ReportCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const reportDefineMethod = new ValidatedMethod({
  name: 'ReportCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Reports.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
      return docID;
    }
    return '';
  },
});

export const reportUpdateMethod = new ValidatedMethod({
  name: 'ReportCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Reports.update(updateData._id, updateData);
    return true;
  },
});

export const reportRemoveItMethod = new ValidatedMethod({
  name: 'ReportCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Reports.removeIt(instance);
  },
});
