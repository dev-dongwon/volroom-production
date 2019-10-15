const redis = require("async-redis");
const client = redis.createClient({
  host: "redis.cr3cu4.ng.0001.apn2.cache.amazonaws.com",
  port: "6379"
});

client.on("connect", () => {
  console.log("redis connected");
});

client.on("error", err => {
  console.log("redis Error " + err);
  process.exit(1);
});

module.exports = client;
