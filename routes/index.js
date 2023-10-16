const express = require('express');
const router = express.Router();

const landingPageController = require('../controllers/landing_page_controller');

router.get('/', landingPageController.landing);

module.exports = router;