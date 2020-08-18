'use strict';

const path = require('path');

const initializeConfig = () => {
    // override $NODE_CONFIG_DIR
    process.env['NODE_CONFIG_DIR'] = __dirname + '/server/config';
};

module.exports = initializeConfig;
