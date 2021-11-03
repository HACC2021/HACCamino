import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Users } from './UserCollection';

export const userDefineMethod = new ValidatedMethod({
  name: 'UserCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = Users.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const userUpdateMethod = new ValidatedMethod({
  name: 'UserCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Users.update(updateData._id, updateData);
    return true;
  },
});

export const userRemoveItMethod = new ValidatedMethod({
  name: 'UserCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Users.removeIt(instance);
  },
});

export const defineAccountRoleUser = new ValidatedMethod({
  name: 'UserRoleAccount.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, password, role, definitionData }) {
    if (Meteor.isServer) {
      const accountID = Accounts.createUser({
        username: email,
        email: email,
        password: password,
      });
      if (role) {
        Roles.createRole(role, { unlessExists: true });
        Roles.addUsersToRoles(accountID, role);
      }
      const userID = Users.define(definitionData);
      return { userID, accountID, password };
    }
    return null;
  },
});
