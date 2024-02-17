const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es requerido."],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "El monto es requerido."]
    },
    category: {
        type: String,
        required: [true, "La categoria es requerida."]
    },
    description: {
        type: String,
        trim: true
    },
    transactionType: {
        type: String,
        required: [true, "El tipo de transacción es requerido."],
        enum: ["ingreso", "gasto"]
    },
    date: {
        type: Date,
        required: [true, "La fecha es requerida."],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true, versionkey: false });

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;