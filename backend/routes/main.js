var router = require('express').Router();




router.get('/', function(req, res) {
  res.send({message: "its working!"})
});

router.get('/about', function(req, res) {
  res.render('main/about');
});


module.exports = router;
