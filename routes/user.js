const express = require('express');
const router = express.Router();
const passport = require('passport')

const userLogController = require('../controllers/user_log');


router.get('/sign-up', userLogController.user_sign_up);
router.get('/sign-in', userLogController.user_sign_in);
// routes/user.js
router.get(`/profile/:id`,passport.checkAuthentication, userLogController.profile);
router.get('/review/:id', passport.checkAuthentication,userLogController.review);
router.post('/create-user', userLogController.create_user);
router.post('/review/create', passport.checkAuthentication, userLogController.createReview);

// passport as a middle-ware to authenticate
router.post('/create-sessions',passport.authenticate(
    'local',
    {
        failureRedirect : '/user/sign-in'
    }
),userLogController.create_session);

router.get('/sign-out', userLogController.destroy_session);

module.exports = router;