const express = require("express");
const { createBook, getBooks, getBook, deleteBook } = require('../controllers/books');

const router = express.Router();

const fs = require('firebase-admin');

const db = fs.firestore(); 


router.route("/")
    .get(getBooks)
    .post(createBook)

router.route("/:id")
    .get(getBook)
    .delete(deleteBook)

module.exports = router;
