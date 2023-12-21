// src/routes/apiRoutes.js

// src/routes/apiRoutes.js
const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get('/:type', apiController.getAll);
router.get('/:type/filtered', apiController.getFilteredData);
router.get('/:type/sorted', apiController.getSortedData);

module.exports = router;
