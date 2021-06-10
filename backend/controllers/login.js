const { getFixtures } = require("../apiClient/axios");
const { matches } = require("../apiClient/helper");

const login = async (req, res) => {
  try {
    const { response } = await getFixtures();
    res.status(200).json(matches(response));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  login,
};
