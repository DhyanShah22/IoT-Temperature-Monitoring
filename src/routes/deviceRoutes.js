const express = require('express');
const { register, list } = require('../controllers/deviceController');
const router = express.Router();

router.post('/register', register);
router.get('/', list);

module.exports = router;
