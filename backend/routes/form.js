var router = require('express').Router();
var Form = require('../models/form');


router.get('/all', function(req,res,next) {
  var location = req.query.location;
  if(location === 'all') {
    Form.find().exec(function(err,forms){
      if(err) return next(err);
      return res.json(forms);
    })
  } else {
    Form.find({province:location}).exec(function(err,forms){
      if(err) return next(err);
      return res.json(forms);
    })
  }

});

router.post('/save', function(req,res,next) {
  var params = req.body;

  var form = new Form(params)
  Form.findOne({pid:params.pid}).exec(function(err,existingUser) {
    if(err) return next(err);
    if(existingUser) {
      res.send({"error":"Form with that participant ID already submitted."})
    } else {
      form.save(function(err,form) {
        if(err) return next(err);
        res.send({"message":"Form successfully submitted."})
      })
    }
  })
});

router.post('/update',function(req,res,next) {
  var params = req.body;

  Form.update({"_id": params._id},params, function(err, result) {
    if(err) return next(err);
    res.send({"message":"Form successfully updated."})
  })
});

router.post('/delete',function(req,res,next){
  var id = req.body._id;
  Form.remove({"_id": id}, function(err, result) {
    if(err) return next(err);
    res.send({"message": "Form successfully deleted."})
  })
});

module.exports = router;
