const db = require("../models/pg");

const createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) res.status(400).end();
    else {
      const user = await db.user.create({
        email,
        name,
      });
      res.status(201).json(user);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  createUser,
};
