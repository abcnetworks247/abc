const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;

const MaxAge = 3 * 24 * 60 * 60;

const CreateToken = (id, MaxAge) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: MaxAge,
  });
};

const VerifyToken = (token) => {
  return  jwt.verify(token, jwt_secret);
}

const storeCooke = () => {

}

module.exports = {CreateToken, VerifyToken};