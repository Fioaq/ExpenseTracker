const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

//Find all transactions
module.exports.findAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200);
        res.json(transactions);
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
//Find transaction
module.exports.findTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id }).populate("user");
        if (transaction) {
            res.status(200);
            res.json(transaction);
            return;
        }
        res.status(404);
        res.json({ error: "Transaction not found" });
    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
//Create transaction
module.exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = await Transaction.create(req.body);

        // Añade la transaccion al usuario en su lista de transacciones
        const userId = req.body.user;
        const user = await User.findByIdAndUpdate(userId, { $push: { transactions: newTransaction._id } }, { new: true });
        res.status(201);
        res.json(newTransaction);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
//Update transaction
module.exports.updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200);
        res.json(updatedTransaction);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};
//Delete transaction
module.exports.deleteTransaction= async (req, res) => {
    try {
        const deletedTransaction = await Transaction.deleteOne({ _id: req.body._id });
        const userId = req.body.user;

        // Actualiza el usuario para quitar el ID de la transacción de su lista de transacciones
        await User.findByIdAndUpdate(userId, { $pull: { transactions: req.body._id } });
        res.status(200);
        res.json(deletedTransaction);

    } catch (error) {
        res.status(500);
        res.json({ error: error });
    }
};