require("dotenv").config();

// sequelize
const sequelize = require("./db/models").sequelize;
sequelize.sync();

// mongo DB
const mongoConnector = require('./mongoDB/connect-mongo');
mongoConnector();

// import modules
const express = require("express"),
      morgan  = require("morgan"),
      helmet  = require("helmet"),
      path    = require("path");

// server application
const app = express();
const clientApp = path.join(__dirname, '../client/build');

// middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// routes
const apiRouter = require("./routes/api");

// routes
app.use("/api", apiRouter);
app.use('*', express.static(clientApp));
module.exports = app;
