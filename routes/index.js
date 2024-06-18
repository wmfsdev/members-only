const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  if (req.user) {
    const test = req.user
    console.log(test)
  }

  res.render('index', { 
    user: req.user,
    username: req.user.username,
  });
});

module.exports = router;
