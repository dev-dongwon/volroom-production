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

// middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
const apiRouter = require("./routes/api");

// routes
app.get('/.well-known/pki-validation/FE3C94157F15039581C5E8153A7D4DB2.txt', (req, res) => {
  res.sendFile(__dirname + '/.well-known/pki-validation/FE3C94157F15039581C5E8153A7D4DB2.txt');
});
app.use("/api", apiRouter);
app.use('*', express.static(clientApp));
module.exports = app;
