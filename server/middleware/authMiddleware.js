const jwt = require("jsonwebtoken");
const User = require("../models/User");
async function protect(request, response, next) {
  try {
    const authorization = request.get("Authorization");
    const parts = (authorization || "").split(" ");

    if (parts.length !== 2) {
      return response.status(401).json({
        message: "authentication required",
      });
    }
    const [scheme, token] = parts;
    if (scheme !== "Bearer" || !token) {
      return response.status(401).json({ message: "authentication required" });
    }
    let tokenVerify;
    try {
      tokenVerify = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ["HS256"],
      });
    } catch (error) {
      return response.status(401).json({ message: "authentication required" });
    }
    const userId = tokenVerify.userId;
    let user;
    try {
      user = await User.findById(userId);
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({ message: "internal server error" });
    }
    if (!user) {
      return response.status(401).json({ message: "authentication required" });
    }
    request.user = user;
    return next();
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "internal server error" });
  }
}

module.exports = protect;
