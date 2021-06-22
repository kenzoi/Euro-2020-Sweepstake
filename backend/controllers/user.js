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

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await db.user.findOne({
      where: { id: userId },
    });
    if (!user) res.status(400).end();
    else {
      await user.destroy();
      res.status(204).end();
    }
  } catch (err) {
    const { code } = err.parent;
    if (code === "22003" || code === "22P02") res.status(400).end();
    else res.status(500).end();
  }
};

module.exports = {
  createUser,
  deleteUser,
};
