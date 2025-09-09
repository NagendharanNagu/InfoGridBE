const express = require('express');
const router = express.Router();
const {createUser,getuserDetails,deleteUser} = require('../controllers/userController');


//* POST request to insert single or multiple users
router.post('/Addusers', createUser)
router.get('/Getuser', getuserDetails)
router.delete("/Deleteusers", deleteUser)

module.exports = router;