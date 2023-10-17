const express = require('express');
const router = express.Router();

const adminLogController = require('../controllers/admin_log');

router.get('/sign-up', adminLogController.admin_sign_up);


module.exports = router;