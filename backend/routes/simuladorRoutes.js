const express = require('express');
const { simular } = require('../controllers/simuladorController');

const router = express.Router();

router.post('/', simular);

module.exports = router;
