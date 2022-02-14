const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require("express");

admin.initializeApp()

const app = express();

const books = require('./routes/books');


app.use("/books", books);


exports.app = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
