const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const { authenticate } = require('../config/jwt.config');

router.post("/new", authenticate, TransactionController.createTransaction);
router.get("/", authenticate, TransactionController.findAllTransactions);
router.get("/:id", authenticate, TransactionController.findTransactionById);
router.get("/update", authenticate, TransactionController.updateTransaction);
router.get("/delete", authenticate, TransactionController.deleteTransaction);

module.exports = router;