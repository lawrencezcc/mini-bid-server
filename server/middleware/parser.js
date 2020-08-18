'use strict';

const express = require('express');

function parserQueue() {
    return [express.json()];
};

module.exports = parserQueue();