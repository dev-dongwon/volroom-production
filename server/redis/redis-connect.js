const redis = require("async-redis");
const client = redis.createClient();

client.on("connect", () => {
  console.log("redis connected");
});

client.on("error", err => {
  console.log("redis Error " + err);
  process.exit(1);
});

module.exports = client;
