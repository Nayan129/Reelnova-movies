import jwt from "jsonwebtoken";
import redis from "../config/cache.js";

/*
 * identifyUser before go to controller
 */
async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "token not found",
    });
  }

  // check token is in blacklist or not
  const tokenBlacklisted = await redis.get(token);

  if (tokenBlacklisted) {
    return res.status(401).json({
      message: "unauthorized user",
    });
  }

  // if token not blacklisted then check token sign with jwt!
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(409).json({
      message: "token not valid",
    });
  }

  req.user = decoded;
  next();
}

export default identifyUser;
