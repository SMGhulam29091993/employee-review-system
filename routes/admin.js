const express = require('express');
const router = express.Router();
const passport  = require('passport');
const adminLogController = require('../controllers/admin_log');

router.get('/sign-up', adminLogController.admin_sign_up);
router.get('/sign-in', adminLogController.admin_sign_in);
router.get('/dashboard',passport.checkAdminAuthentication, adminLogController.admin_dashboard);
router.get('/profile',passport.checkAdminAuthentication, adminLogController.admin_profile);
router.post('/create', adminLogController.create);
router.post('/create-admin-sessions',passport.authenticate(
    'localAdmin',
    {
        failureRedirect : '/admin/sign-in'
    }
),adminLogController.create_admin_session);

router.get('/sign-out', adminLogController.destroy_admin_session);

module.exports = router;