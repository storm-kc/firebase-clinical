const express = require("express");
const { checkSchema, validationResult } = require('express-validator');
const { createPatient, getPatient, getPatients, deletePatient, updatePatient } = require('./patients.controllers');
const { Patient } = require('./patient');

const validatePatient = async (req, res, next) => {
    await Promise.all(checkSchema(Patient.schema).map((validation) => validation.run(req)));
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
  
    return next;
  };
  
const router = express.Router();

router.route("/")
    .get(getPatients)
    .post(validatePatient, createPatient)

router.route("/:id")
    .get(getPatient)
    .delete(deletePatient)
    .put(validatePatient, updatePatient)

module.exports = router;
