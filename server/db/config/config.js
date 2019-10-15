const development = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: "ebdb",
  host: process.env.RDS_HOSTNAME,
  dialect: "mysql",
  port: process.env.RDS_PORT
};

const production = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: "ebdb",
  host: process.env.RDS_HOSTNAME,
  dialect: "mysql",
  port: process.env.RDS_PORT
};

const test = {
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: "ebdb",
  host: process.env.RDS_HOSTNAME,
  dialect: "mysql",
  port: process.env.RDS_PORT
};

module.exports = { development, production, test };
