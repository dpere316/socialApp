const router = require("express").Router();
const Style = require("../models/Style.model");
const express = require("express");
const User = require("../models/User");
const uploader = require("../config/cloudinary-setup");

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
router.post("/other-profile", (req, res) => {
  User.findById(req.body.id)
    .populate([
      {
        path: "friends",
        model: "User",
      },
      {
        path: "otherstyle",
        model: "Style",
      },
      {
        path: "status",
        model: "Status",
      },
    ])
    .then((user) => res.json({ user }));
});
//Displays a list of users
router.get("/find-users", isAuth, (req, res, next) => {
  User.find({ _id: { $ne: req.user._id } }).then((users) => {
    console.log("user", users);
    res.json({ users });
  });
});

router.post("/song", isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { song: req.body.song }, { new: true })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => console.error(err));
});

router.get("/get-friends", isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .populate("friends")
    .then((users) => {
      console.log("user", users);
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
  );
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

// Remove theme from list
router.post("/remove-theme", isAuth, (req, res, next) => {
  console.log(
    "The person who clicked the button",
    req.user._id,
    "Removed Theme",
    req.body._id
  );
  User.findByIdAndUpdate(req.user._id, {
    $pull: { styles: req.body._id },
  }).then((users) => {
    Style.deleteOne({ _id: req.body._id }).then((users) => {
      res.json({ styles: false });
    });
  });
});

router.get("/profile", isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .populate("styles")
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

router.get("/others-profile", isAuth, (req, res, next) => {
  User.findById() //Other person ID not yours
    .populate("styles")
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

router.post("/api/uploadfile", uploader.single("upload"), (req, res, next) => {
  console.log(req.body, req.file);
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { image: req.file.path },
    { new: true }
  ) //Other person ID not yours
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json(err));
});
function isAuth(req, res, next) {
  req.isAuthenticated()
    ? next()
    : res.status(401).json({ msg: "Log in first" });
}

module.exports = router;
