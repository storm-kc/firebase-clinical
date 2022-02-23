const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { createClinician, deleteClinician, getClinician, getClinicians, updateClinician, updateClinicianWithPatient, removePatientFromClinician } = require('./clinicians.controllers');
const { Clinician } = require('./clincian.model');

const validateClinician = async (req, res, next) => {
  await Promise.all(checkSchema(Clinician.schema).map((validation) => validation.run(req)));

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

router.route('/')
  .get(getClinicians)
  .post(validateClinician, createClinician);

router.route('/:id')
  .delete(deleteClinician)
  .get(getClinician)
  .put(validateClinician, updateClinician);

router.route('/addPatient/:id')
  .put(updateClinicianWithPatient);

router.route('/removePatient/:id')
  .put(removePatientFromClinician);

module.exports = router;
