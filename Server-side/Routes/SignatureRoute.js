const express = require('express');
const  router = express.Router();
const { saveSignature, getSignature, deleteSignature } = require('../Controllers/SignatureController');


router.post('/',saveSignature)
router.get('/',getSignature)
router.post('/delete',deleteSignature)

module.exports = router;