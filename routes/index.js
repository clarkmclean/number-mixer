var express = require('express');
var fs    = require("fs");
var router = express.Router();

/* GET number-mixer. */
router.get('/', function(req, res) {
  	res.render('number-mixer', { title: 'Number-Mixer'});
});

module.exports = router;
