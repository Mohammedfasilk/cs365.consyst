const express = require('express');
const router = express.Router();
const { Authenticate, AuthConfig} =  require('../Controllers/AuthController');

router.post('/', Authenticate);
router.get('/auth-config', AuthConfig);


module.exports = router;