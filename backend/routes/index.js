const router = require("express").Router();
const Style = require("../models/Style.model");
const express = require("express");
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/home", (req, res, next) => {
  let styles = {
    header: {
      backgroundColor: "blue",
    },
    ul: {
      backgroundColor: "green",
    },
  };

  res.status(200).json({ styles });
});

router.post("/profile", isAuth, (req, res) => {
  console.log(req.body);
  let styles = req.body;

  Style.create({ styles, userID: req.user._id }).then((responseFromDB) => {
    console.log("Wthast ups", responseFromDB, responseFromDB._id);
    User.findByIdAndUpdate(req.user._id, {
      $push: { styles: responseFromDB._id },
    }).then((user) => {
      res.json({ user, responseFromDB });
    });
  });
});
router.post("/profile/status", isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then((user) => {
    res.json({ user });
  });
});

router.get("/find-friends", isAuth, (req, res, next) => {
  User.find().then((users) => {
    res.json({ users });
  });
});

router.post("/add-friends", isAuth, (req, res, next) => {
  console.log(
    "The person who clicked the button",
    req.user._id,
    "Befriended",
    req.body._id
  );
  User.findByIdAndUpdate(req.user._id, {
    $push: { friends: req.body._id },
  }).then((users) => {
    User.findByIdAndUpdate(req.body._id, {
      $push: { friends: req.user._id },
    }).then((users) => {
      res.json({ friends: true });
    });
  });
});











function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}
module.exports = router;
