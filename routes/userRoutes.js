const express = require('express')
const { loginController, registerController, authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')


// router object 
const router = express.Router()

// routes 
// login || POST 
router.post('/login',loginController)

// register || POST 
router.post('/register',registerController)

// auth ||post 
router.post('/getUserData',authMiddleware,authController)
module.exports=router