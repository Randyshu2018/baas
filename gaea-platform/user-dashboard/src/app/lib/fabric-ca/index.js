'use strict';

module.exports = app => {

  async function enrollAdmin(caHost, caPort, mspId, caStorePath, caDockerStorePath, userName, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.enrollAdminV1_4(caHost, caPort, mspId, caStorePath, caDockerStorePath, userName);
      case 'ca_v1.1':
      default:
        return await app.enrollAdminV1_1(caHost, caPort, mspId, caStorePath, caDockerStorePath, userName);
    }
  }

  async function registerUser(registerUser, caHost, caPort, mspId, name, role, password, userAffilication, caStorePath, caDockerStorePath, attributes, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.registerUserV1_4(registerUser, caHost, caPort, mspId, name, role, password, userAffilication, caStorePath, caDockerStorePath, attributes);
      case 'ca_v1.1':
      default:
        return await app.registerUserV1_1(registerUser, caHost, caPort, mspId, name, role, password, userAffilication, caStorePath, caDockerStorePath, attributes);
    }
  }

  async function deleteUser(registerUser, name, reason, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.deleteUserV1_4(registerUser, name, reason, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.deleteUserV1_1(registerUser, name, reason, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function getUserIdentity(registerUser, targetName, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.getUserIdentityV1_4(registerUser, targetName, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.getUserIdentityV1_1(registerUser, targetName, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function reenrollUser(registerUser, name, mspId, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.reenrollUserV1_4(registerUser, name, mspId, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.reenrollUserV1_1(registerUser, name, mspId, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function createUserAffiliation(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.createUserAffiliationV1_4(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.createUserAffiliationV1_1(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function getUserAffiliations(registerUser, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.getUserAffiliationsV1_4(registerUser, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.getUserAffiliationsV1_1(registerUser, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function delUserAffiliations(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.delUserAffiliationsV1_4(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.delUserAffiliationsV1_1(registerUser, name, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  async function updateUserAffiliation(sourceName, targetName, caHost, caPort, caStorePath, caDockerStorePath, networkType = 'ca_v1.1') {
    switch (networkType) {
      case 'ca_v1.4':
        return await app.updateUserAffiliationV1_4(sourceName, targetName, caHost, caPort, caStorePath, caDockerStorePath);
      case 'ca_v1.1':
      default:
        return await app.updateUserAffiliationV1_1(sourceName, targetName, caHost, caPort, caStorePath, caDockerStorePath);
    }
  }

  app.enrollAdmin = enrollAdmin;
  app.registerUser = registerUser;
  app.deleteUser = deleteUser;
  app.getUserIdentity = getUserIdentity;
  app.reenrollUser = reenrollUser;
  app.createUserAffiliation = createUserAffiliation;
  app.getUserAffiliations = getUserAffiliations;
  app.delUserAffiliations = delUserAffiliations;
  app.updateUserAffiliation = updateUserAffiliation;
}
