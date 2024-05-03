const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.home);
// router.get('/category/:slug', authController.isLoggedIn, viewsController.getCategory);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/signup', viewsController.getSignUpForm);

router.get('/editportfolio', authController.protect, viewsController.editPortfolio);

router.get('/search', authController.protect, authController.isLoggedIn, viewsController.search);
router.get('/searchresults', authController.protect, authController.isLoggedIn, viewsController.searchResults);
router.get('/:id', viewsController.getUserAndDisplay);

module.exports = router;

//authController.isLoggedIn is for hidding or revealing the portfolio btn and the condition of that is in views/_header.pug
