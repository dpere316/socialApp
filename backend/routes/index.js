const router = require("express").Router();
const Style = require("../models/Style.model");
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
function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}
module.exports = router;
