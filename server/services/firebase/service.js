'use strict';

const client = require('./client');

class FirebaseService {
    constructor() {
        this._firebaseClient = client;
        this._auth = this._getAuthService();
        this._db = this._getDBService();
        this.uId = '';
    }

    _getAuthService() {
        try {
            return this._firebaseClient.auth();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    _getDBService() {
        try {
            return this._firebaseClient.database();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async signIn(email, password) {
        if (!this._auth || !email || !password) {
            return;
        }

        let snapshot = {};
        snapshot = await this._auth.signInWithEmailAndPassword(email, password).catch((e) => {
            console.error(e);
        });

        return this.uId = snapshot.user && (snapshot.user.uid || '');
    }

    async getUserInfomation() {
        if (!this._db || !this.uId) {
            return;
        }
        
        const snapshot = await this._db.ref('/users/' + this.uId).once('value').catch((e) => {      
            console.error(e);      
        });
        const userInfo = (snapshot && snapshot.val()) || {};
        return userInfo;
    }
}

module.exports = FirebaseService;