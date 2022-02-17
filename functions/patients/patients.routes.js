const express = require("express");
const { createPatient, getPatient, getPatients, deletePatient, updatePatient } = require('./patients.controllers');

const router = express.Router();

const fs = require('firebase-admin');

const db = fs.firestore(); 


router.route("/")
    .get(getPatients)
    .post(createPatient)

router.route("/:id")
    .get(getPatient)
    .delete(deletePatient)
    .put(updatePatient)

module.exports = router;
