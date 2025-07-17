const express = require('express');
const router = express.Router();
const { saveUser, getUser, deleteUser, getSingleUser } =  require('../Controllers/UserController');

router.post('/', saveUser);
router.get('/', getUser);
router.post('/delete', deleteUser)
router.post('/session-user', getSingleUser)

module.exports = router;