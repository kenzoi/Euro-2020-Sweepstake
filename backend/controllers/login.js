const { getFixtures } = require("../apiClient/axios");
const { matchesJSON } = require("../apiClient/helper");

const login = async (req, res) => {
  try {
    const { response } = await getFixtures();
    // eslint-disable-next-line no-console
    console.log(matchesJSON(response));
    res.status(200).json({ message: "Success" });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  login,
};
