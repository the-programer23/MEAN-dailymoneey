const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(middleware) executes the middleware for all the routes below
// router.use(authController.isLoggedIn);

router.use(viewsController.alerts)

router.get('/', authController.isLoggedIn, viewsController.getHome);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/emailConfirmed/:token', authController.protect, viewsController.emailConfirmed)
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protect, viewsController.getAccount);
// router.get('/admin', authController.isLoggedIn, viewsController.getHome);
// router.get('/tour/:tourSlug', authController.isLoggedIn, viewsController.getTour);

// this route is only for the travel agency user, not for the admin
// router.get('/my-bookings', authController.protect, viewsController.getMyTours);


// router.get('/activeTours', authController.protect, viewsController.getActiveTours);
// router.get('/createTour', authController.protect, viewsController.getCreateTourForm);
router.post('/submit-user-data', authController.protect, viewsController.updateUserData);


module.exports = router;