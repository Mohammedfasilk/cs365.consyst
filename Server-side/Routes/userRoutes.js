const express = require('express');
const router = express.Router();
const { saveUser, getUser, deleteUser } =  require('../Controllers/UserController');

router.post('/', saveUser);
router.get('/', getUser);
router.post('/delete', deleteUser)

module.exports = router;