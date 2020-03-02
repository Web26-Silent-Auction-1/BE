const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  if (!req.body.username || !req.body.password || !req.body.user_type) {
    res.status(400).json({ errorMessage: "Please fill out all fields" });
  } else {
    Users.add(user)
      .then(user => {
        const token = generateToken(req.body);
        res.status(201).json({ user, token });
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ errorMessage: "Failed to add user to the database." });
      });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (!req.body.username || !req.body.password) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a username and password." });
  } else {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          // console.log(user.user_type)
          const type = user.user_type;

          res
            .status(200)
            .json({ message: `Welcome ${user.username}!`, token, type });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Unable to login." });
      });
  }
});

function generateToken(user) {
  const payload = {
    username: user.username,
    user_type: user.user_type,
    user_id: user.id
  };

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
