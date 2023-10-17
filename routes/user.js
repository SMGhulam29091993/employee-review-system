const express = require('express');
const router = express.Router();

const userLogController = require('../controllers/user_log');


router.get('/sign-up', userLogController.user_sign_up);
router.get('/sign-in', userLogController.user_sign_in);

module.exports = router;