const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

const app = express();

admin.initializeApp()

const clinicians = require('./clinicians.routes');

app.use('/clinicians', clinicians);

exports.app = functions.https.onRequest(app);
