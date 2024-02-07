const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

router.post("/new", UserController.createUser);
router.get("/cookie", authenticate, UserController.cookie);
router.get("/", authenticate, UserController.findAllUsers);
router.get("/:id", authenticate, UserController.findUserById);

module.exports = router;