'use strict';

const firebase = require('firebase');
const initializeConfig = require('../../../initialize');

initializeConfig();
const config = require('config').get('firebase');
const firebaseClient = firebase.initializeApp(config);

module.exports = firebaseClient;