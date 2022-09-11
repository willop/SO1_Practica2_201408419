const express = require('express');
const router = express.Router();

const sistema = require('../controllers/sistema');

router.get('/ram', sistema.ram);
router.get('/cpu', sistema.cpu);


module.exports = router;