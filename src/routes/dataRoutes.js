const express = require('express');
const { fetchData } = require('../controllers/dataController');
const router = express.Router();

router.get('/:deviceId', fetchData);

module.exports = router;
