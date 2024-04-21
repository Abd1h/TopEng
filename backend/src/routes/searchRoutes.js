const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.post('/searchResult', searchController.getSearchResult);
// router.get('/searchResult', searchController.getSearchResult);
module.exports = router;
