const addPredictions = (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

const getPredictions = (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
};

module.exports = {
  addPredictions,
  getPredictions,
};
