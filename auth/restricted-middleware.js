const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

const requireCredentials = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: "Invalid credentials" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ errorMessage: "No credentials provided" });
  }
};

// const checkUserType = (req, res, next) => {
//   const { type } = req.headers;

//   console.log(req.decodedToken);
// };

const requireSeller = (req, res, next) => {
  const type = req.decodedToken.user_type;
  console.log(type);
  if (type === "seller") {
    next();
  } else {
    res.status(401).json({ errorMessage: "Invalid credentials" });
  }
};

const requireBidder = (req, res, next) => {
  const type = req.decodedToken.user_type;

  if (type === "bidder") {
    next();
  } else {
    res.status(401).json({ errorMessage: "Invalid credentials" });
  }
};

module.exports = {
  requireCredentials,
  requireSeller,
  requireBidder
};
