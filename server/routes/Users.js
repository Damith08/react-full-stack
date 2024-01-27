const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      // User not found
      return res.json({ err: "User doesn't Exist" });
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        // Incorrect password
        return res.json({ err: "Wrong Username and Password Combination" });
      }

      // Passwords match, user logged in successfully
      res.json("YOU LOGGED IN!!!");
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = router;
