const express = require('express');

const router = express.Router();
const { retreiveDashboard } = require('../../controllers/adminPanel/dashboardController');

router.get('/get-dashboard/:id?', retreiveDashboard);

module.exports = router;
