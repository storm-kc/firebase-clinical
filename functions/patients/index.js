const functions = require("firebase-functions");
const admin = require('firebase-admin');

const express = require("express");

admin.initializeApp()

const app = express();

const patients = require('./patients.routes');


app.use("/patients", patients);


exports.app = functions.https.onRequest(app);
