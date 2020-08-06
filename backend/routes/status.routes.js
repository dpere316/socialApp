const express = require("express");
const router = express.Router();
const Status = require("../models/status.model");
const User = require("../models/User");

// Displays the status of all friends on feed
router.post("/add-status", isAuth, (req, res, next) => {
  console.log("hello", req.body);
  Status.create({
    ...req.body,
    user: req.user._id,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  }).then((status) => {
    User.findByIdAndUpdate(
      req.user._id,
      { status: status._id },
      { new: true }
    ).then((user) => {
      console.log("user", status);
      res.json({ status, user });
    });
  });
});

router.get("/get-status", isAuth, (req, res, next) => {
  Status.find()
    .populate("user")
    .then((status) => {
      console.log(status);
      res.json(status);
    })
    .catch((err) => console.log(err));
});

router.get("/user-status", isAuth, (req, res, next) => {
  console.log("user122", req.query);
  Status.find({ user: req.query.id })
    .then((status) => {
      console.log(status);
      res.json(status.pop());
    })
    .catch((err) => console.log(err));
});

// Is logged in
function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

module.exports = router;
