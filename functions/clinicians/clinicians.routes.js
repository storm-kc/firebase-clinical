const express = require('express');
const { createClinician, deleteClinician, getClinician, getClinicians, updateClinician } = require('./clinicians.controllers');
const router = express.Router();

router.route('/')
  .get(getClinicians)
  .post(createClinician);

router.route('/:id')
  .delete(deleteClinician)
  .get(getClinician)
  .put(updateClinician);

module.exports = router;
