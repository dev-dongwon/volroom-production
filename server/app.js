require("dotenv").config();

// sequelize
const sequelize = require("./db/models").sequelize;
sequelize.sync();

// mongo DB
const mongoConnector = require("./mongoDB/connect-mongo");
mongoConnector();

// import modules
const express = require("express"),
      morgan  = require("morgan"),
      helmet  = require("helmet"),
      path    = require("path"),
      cors    = require("cors");

// server application
const app = express();
const clientApp = path.join(__dirname, '../client/build');
const faceDetectModel = path.join(__dirname, 'public/models');

// middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
const apiRouter = require("./routes/api");

// routes
app.use("/api", apiRouter);
app.use("/models", express.static(faceDetectModel))
app.use('*', express.static(clientApp));
module.exports = app;
