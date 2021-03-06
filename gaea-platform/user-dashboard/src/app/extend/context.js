/*
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';

module.exports = {
  get getChannelNameTest(){
    return this.app.getChannelNameTest;
  },
  get fabricHelper() {
    return this.app.fabricHelper;
  },
  get getClientForOrg() {
    return this.app.getClientForOrg;
  },
  get getOrgAdmin() {
    return this.app.getOrgAdmin;
  },
  get getChannelForOrg() {
    return this.app.getChannelForOrg;
  },
  get createChannel() {
    return this.app.createChannel;
  },
  get joinChannel() {
    return this.app.joinChannel;
  },

  get instantiateChainCode() {
    return this.app.instantiateChainCode;
  },
  get installChainCode() {
    return this.app.installChainCode;
  },

  get installSmartContract() {
    return this.app.installSmartContract;
  },
  get invokeChainCode() {
    return this.app.invokeChainCode;
  },
  get queryChainCode() {
    return this.app.queryChainCode;
  },
  get instantiateSmartContract() {
    return this.app.instantiateSmartContract;
  },
  get getChainInfo() {
    return this.app.getChainInfo;
  },
  get getChannelHeight() {
    return this.app.getChannelHeight;
  },
  get getBlockByNumber() {
    return this.app.getBlockByNumber;
  },
  get getRecentBlock() {
    return this.app.getRecentBlock;
  },
  get getRecentTransactions() {
    return this.app.getRecentTransactions;
  },
  get getChainCodes() {
    return this.app.getChainCodes;
  },
  get getChannels() {
    return this.app.getChannels;
  },
  get sleep() {
    return this.app.sleep;
  },
  get getPeersForChannel() {
    return this.app.getPeersForChannel;
  },
  get getPeersForOrg() {
    return this.app.getPeersForOrg;
  },
  get getRegisteredUserV1_1() {
    return this.app.getRegisteredUserV1_1;
  },
  get getLastBlock() {
    return this.app.getLastBlock;
  },
  get getBlockInfoByNumber() {
    return this.app.getBlockInfoByNumber;
  },
  get enrollAdmin() {
    return this.app.enrollAdmin;
  },
  get registerUser() {
    return this.app.registerUser;
  },
  get deleteUser() {
    return this.app.deleteUser;
  },
  get getUserIdentity() {
    return this.app.getUserIdentity;
  },
  get reenrollUser() {
    return this.app.reenrollUser;
  },
  get createUserAffiliation() {
    return this.app.createUserAffiliation;
  },
  get getUserAffiliations() {
    return this.app.getUserAffiliations;
  },
  get delUserAffiliations() {
    return this.app.delUserAffiliations;
  },
  get updateUserAffiliation() {
    return this.app.updateUserAffiliation;
  },  
  get signUpdate() {
      return this.app.signUpdate;
  },
  get applyUpdate() {
      return this.app.applyUpdate;
    },
};
