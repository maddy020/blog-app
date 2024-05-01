const jwt = require("jsonwebtoken");

async function getUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(404).json({ msg: "No token found" });
    const validUser = jwt.verify(token, process.env.secret);
    if (!validUser) return res.status(401).json({ msg: "Invalid User" });
    req.user = validUser;
    next();
  } catch (error) {
    console.error("Error in getUser", error);
  }
}
module.exports = getUser;
