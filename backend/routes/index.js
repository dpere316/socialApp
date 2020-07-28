const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ msg: 'Working' });
});

router.get('/home',(req,res,next) => {
 let styles = {
    header: {
      backgroundColor: "blue",
    },
    ul: {
      backgroundColor: "green",
    },
  }

  res.status(200).json({ styles });


});

module.exports = router;
