const express = require('express');
const { createClinician, getClinician, getClinicians } = require('./clinicians.controllers');
const router = express.Router();

router.route('/')
  .get(getClinicians)
  .post(createClinician);

router.route('/:id')
  .get(getClinician);

module.exports = router;
