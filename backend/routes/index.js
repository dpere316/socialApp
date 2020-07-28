const express = require('express');
const router = express.Router();
const Users = require('../models/User')

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});


module.exports = router;
