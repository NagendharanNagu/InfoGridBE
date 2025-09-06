const express = require('express');
const router = express.Router();
const {createUser,getuserDetails} = require('../controllers/userController');


//* POST request to insert single or multiple users
router.post('/Addusers', createUser)
router.get('/Getuser', getuserDetails)

module.exports = router;