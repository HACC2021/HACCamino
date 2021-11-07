import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Updates } from './UpdateCollection';

export const updateDefineMethod = new ValidatedMethod({
  name: 'UpdateCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = Updates.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const updateRemoveItMethod = new ValidatedMethod({
  name: 'UpdateCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Updates.removeIt(instance);
  },
});
