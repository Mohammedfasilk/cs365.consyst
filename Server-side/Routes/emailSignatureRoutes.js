const express = require('express');
const router = express.Router();
const { saveEmailSignature,getEmailSignatures,deleteEmailSignature} = require('../Controllers/EmailSignatureController');

router.post('/', saveEmailSignature);
router.get('/', getEmailSignatures);
router.post('/delete', deleteEmailSignature);

module.exports = router;
