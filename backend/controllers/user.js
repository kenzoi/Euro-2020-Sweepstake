const db = require("../models/pg");

const createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await db.user.create({
      email,
      name,
    });
    res.status(200).json(user);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createUser,
};
