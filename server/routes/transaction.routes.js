const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transaction.controller');
const { authenticate } = require('../config/jwt.config');

router.post("/new", authenticate, TransactionController.createTransaction);
router.get("/", authenticate, TransactionController.findAllTransactions);
router.get("/:id", authenticate, TransactionController.findTransactionById);
router.patch("/update", authenticate, TransactionController.updateTransaction);
router.delete("/delete", authenticate, TransactionController.deleteTransaction);

module.exports = router;