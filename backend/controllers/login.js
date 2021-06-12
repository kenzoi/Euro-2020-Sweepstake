const { getFixtures } = require("../apiClient/axios");
const { dbUpsert } = require("../helper");
const { setCache, getCache } = require("../models/redis");

const login = async (req, res) => {
  try {
    const inCache = await getCache();
    if (inCache) {
      await dbUpsert(JSON.parse(inCache));
      res.status(200).send(JSON.parse(inCache));
    } else {
      const { response } = await getFixtures();
      await dbUpsert(response);
      const data = JSON.stringify(response);
      await setCache(data);
      res.status(200).send(JSON.parse(data));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  login,
};
