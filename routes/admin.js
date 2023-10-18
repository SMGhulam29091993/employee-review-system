const express = require('express');
const router = express.Router();

const adminLogController = require('../controllers/admin_log');

router.get('/sign-up', adminLogController.admin_sign_up);
router.get('/sign-in', adminLogController.admin_sign_in);
router.get('/dashboard', adminLogController.admin_dashboard);
router.post('/create', adminLogController.create);


module.exports = router;