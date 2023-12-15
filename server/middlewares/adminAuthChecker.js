const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/clientAuthSchema");
const { VerifyToken } = require("../Helper/authToken");
const { UnAuthorizedError } = require("../errors");

const secreteKey = process.env.JWT_SECRET;

const checkUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = VerifyToken(token);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      throw new UnAuthorizedError("User not found");
    }

    req.user = user;
    req.userRole = user.role;

    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }
};

module.exports = checkUser;
