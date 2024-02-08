require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
app.use(cookieParser());
require("./config/mongoose.config");
app.use(
    cors({
        credentials: true,
        origin: [`${process.env.API_URL}`,]
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionRoutes = require("./routes/session.routes");
app.use('/api/session', sessionRoutes);

const userRoutes = require("./routes/user.routes");
app.use('/api/user', userRoutes);

const transactionRoutes = require("./routes/transaction.routes");
app.use('/api/transaction', transactionRoutes);

app.listen(port, () => console.log(`listen port: ${port}`));