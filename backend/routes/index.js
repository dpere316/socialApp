const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});


//Displays a list of users 
router.get("/find-users", isAuth, (req, res, next) => {
  User.find({_id:{$ne:req.user._id}}).then((users) => {
    console.log("user",users)
    res.json({ users });
  });
});

//Add Friends
router.post("/add-friends", isAuth, (req, res, next) => {
  console.log(
    "The person who clicked the button",
    req.user._id,
    "Befriended",
    req.body._id
  )
  User.findByIdAndUpdate(req.user._id, {
    $addToSet: { friends: req.body._id },
  }).then((users) => {
    User.findByIdAndUpdate(req.body._id, {
      $addToSet: { friends: req.user._id },
    }).then((users) => {
      res.json({ friends: true });
    });
  });
});

// Remove friend from list
router.post("/remove-friends", isAuth, (req, res, next) => {
  console.log(
    "The person who clicked the button",
    req.user._id,
    "Removed Friend",
    req.body._id
  );
  User.findByIdAndUpdate(req.user._id, {
    $pull: { friends: req.body._id },
  }).then((users) => {
    User.findByIdAndUpdate(req.body._id, {
      $pull: { friends: req.user._id },
    }).then((users) => {
      res.json({ friends: false });
    });
  });
});









// Is logged in
function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

module.exports = router;
