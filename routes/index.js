var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/policy', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/terms', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
