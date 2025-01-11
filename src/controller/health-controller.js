const ping = async (req, res, next) => {
  try {
    res.json({ message: "Ping!" });
  } catch (e) {
    next(e);
  }
}

export default {
  ping
}