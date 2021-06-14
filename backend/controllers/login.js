const { getFixtures } = require("../apiClient/axios");
const { dbUpsert } = require("../helper");
const db = require("../models/pg");
const { setCache, getCache } = require("../models/redis");

const login = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await db.user.findOne({ where: { email } });
    const inCache = await getCache();
    if (inCache) {
      await dbUpsert(JSON.parse(inCache));
    } else {
      const { response } = await getFixtures();
      await dbUpsert(response);
      const data = JSON.stringify(response);
      await setCache(data);
    }
    res.status(200).send(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  login,
};
