const redis = require("redis");

const client = redis.createClient();

client.on("error", (e) => {
  // eslint-disable-next-line no-console
  console.log(e);
});

const setCache = (data) =>
  new Promise((resolve, reject) => {
    client.setex("apiData", process.env.REDIS_TTL, data, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });

const getCache = () =>
  new Promise((resolve, reject) => {
    client.get("apiData", (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });

module.exports = {
  client,
  setCache,
  getCache,
};
