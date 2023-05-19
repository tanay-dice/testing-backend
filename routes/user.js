const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { getAllUsers, createUser, getUserById, deleteUser, userLogin, updateUser} = require('../controllers/userController');
const isAuthenticated = require('../middleware/check-auth');

// import isAuthenticated from '../middleware/check-auth'


router.get('/getAll', getAllUsers);

// Creating a user  
router.post('/create-user', createUser);

router.get('/getUser/:id', getUserById);

router.delete('/delete/:id', deleteUser);

router.post('/login', userLogin);

router.patch('/update/:id', updateUser)


module.exports = router;
