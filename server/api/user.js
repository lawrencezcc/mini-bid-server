'use strict';

const express = require('express');
const firebaseService = require('../services/firebase/service');
const firebase = new firebaseService();
const router = express.Router();
const validator = require('is-my-json-valid');
const requestSchema = require('../jsonSchemas/schema');
const parserQueue = require('../middleware/parser');

router.use(parserQueue);

router.post('/login', async(req, res) => {
    const isBodyValid = validator(requestSchema.login);

    const reqBody = req.body;
    if (!reqBody || !isBodyValid(reqBody)) {
        res.sendStatus(400);
        return;
    }

    const {email, password} = reqBody;
    const uId = await firebase.signIn(email, password);
    res.json(uId);
});

router.post('/info', async(req, res) => {
    const userInfo = await firebase.getUserInfomation();
    if (typeof userInfo === 'undefined') {
        res.status(400).send('Please login first');
        return;
    }
    res.json(userInfo);
});

module.exports = router;
