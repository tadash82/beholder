const express = require("express");
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authController = require("./controllers/authController");

const morgan = require("morgan");
const settingsRouter = require("./routers/settingsRouter");
const symbolRouter = require("./routers/symbolRouter");
const exchangeRouter = require("./routers/exchangeRouter");

const app = express();

//app.use(cors({ origin: '*'}));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.post("/login", authController.doLogin);

app.use("/settings", authMiddleware, settingsRouter);
app.use("/symbols", authMiddleware, symbolRouter);
app.use("/exchange", authMiddleware, exchangeRouter);

app.post("/logout", authController.doLogout);

app.use(errorMiddleware);

module.exports = app;
