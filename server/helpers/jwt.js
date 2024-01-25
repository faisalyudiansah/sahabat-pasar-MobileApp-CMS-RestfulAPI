const jwt = require("jsonwebtoken");

function signToken(userLogin) {
  return jwt.sign({
    _id: userLogin._id,
    email: userLogin.email,
    role: userLogin.role,
  }, process.env.JWT_SECRET);
}

function verifyToken(token) {
  let data = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return "Invalid Token"
    } else {
      return decoded
    }
  })
  return data
}

module.exports = {
  signToken,
  verifyToken,
};
