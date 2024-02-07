const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

router.post("/login", UserController.login);
router.post("/forgotPassword", UserController.forgotPassword);
router.patch("/resetPassword/:token", UserController.resetPassword);
router.delete("/logout", authenticate, UserController.loggout);

module.exports = router;