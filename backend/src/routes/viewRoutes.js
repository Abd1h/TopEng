const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.home);
// router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/signup', viewsController.getSignUpForm);

router.get('/editportfolio', authController.protect, viewsController.editPortfolio);
router.get('/search', viewsController.search);
// router.get('/search', authController.protect, viewsController.search);
router.get('/searchresults', viewsController.searchResults);

module.exports = router;
