const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middleware/AuthMiddleware");

const { sign } = require("jsonwebtoken");

// user registration

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Users.create({
        username: username,
        password: hash,
      });
      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Error creating user",
        data: err,
      });
    });
});

// user login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt
    .compare(password, user.password)
    .then((match) => {
      if (!match)
        res.json({ error: "Wrong Username And Password Combination" });

      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );

      res.json({ token: accessToken, username: username, id: user.id });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        data: err,
      });
    });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

// update password
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt
    .compare(oldPassword, user.password)
    .then(async (match) => {
      if (!match) res.json({ error: "Wrong Password Entered!" });

      bcrypt
        .hash(newPassword, 10)
        .then((hash) => {
          Users.update(
            { password: hash },
            { where: { username: req.user.username } }
          );
          return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
          });
        })
        .catch((err) => {
          return res.status(500).json({
            success: false,
            message: "Error creating user",
            data: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        data: err,
      });
    });
});

module.exports = router;
