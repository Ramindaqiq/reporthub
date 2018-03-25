var router = require('express').Router();
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var passportConf = require('../config/passport');
var secret = require('../config/secret');
var verifyToken = require('../config/verifyToken');
var jwt = require('jsonwebtoken');

//Get one user

router.post('/one', verifyToken, function(req,res,next) {
  User.findOne({_id: req._id},{fullName:1,email:1,mobileNumber:1,username:1,role:1,_id:1}).exec(function(err,user) {
    if(err) return next(err)
    res.send(user);
  })
});
/* GET all users. */
router.post('/all',verifyToken, function(req, res, next) {
    var role = req.body.role;
    if(role === 'all') {
      User.find({'_id':{$ne:req._id}}).exec(function(err,users) {
        if(err) return next(err)
        return res.status(200).send({success:true,users:users})
      })
    } else {
      User.find({'_id':{$ne:req._id},'role': role}).exec(function(err,users) {
        if(err) return next(err)
        return res.status(200).send({success:true,users:users})
      })
    }
});
router.post('/delete',function(req,res,next){
  var id = req.body._id;
  User.remove({"_id": id}, function(err, result) {
    if(err) return next(err);
    res.send("User successfully deleted.")
  })
});
router.post('/login', function(req,res) {
  User.findOne({ username: req.body.username}, function(err, user) {
    if (err) return done(err);
    if (!user) {
      return res.status(404).send('No user found with that username!');
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).send('Wrong password buddy!');
    }else {
      var jwtTokenUser = {
        _id: user._id
      }
      var token = jwt.sign(jwtTokenUser,secret.secretKey, {
        expiresIn: 86400
      });
      return res.status(200).send({auth:true,token:token,fullName:user.fullName,role:user.role});
    }
  });
})
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.get('/verifyLogin', verifyToken, function(req, res, next) {
  User.findOne({email : req.email}, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
});
router.post('/register', function(req, res, next) {
  User.findOne({$or:[{email: req.body.email},{mobileNumber: req.body.mobileNumber}]}, function(err, existingEmail) {
    if (existingEmail) {
      return res.status(404).send('Account with that email address or mobile number already exists.');
    } else {
      User.findOne({username: req.body.username}, function(err, existingUser) {
        if(existingUser) {
          return res.status(404).send('Account with that username already exists.');
        } else {
          var salt = bcrypt.genSaltSync(10);;
          bcrypt.hash(req.body.password, salt, null, function(err, hash) {
            if (err) return next(err);

            var user = new User();
            user.fullName = req.body.fullName;
            user.email = req.body.email;
            user.mobileNumber = req.body.mobileNumber;
            user.username = req.body.username;
            user.password = hash;
            if(req.body.role) {
              user.role = req.body.role;
            } else {
              user.role = "viewer";
            }
            user.save(function(err, user) {
              if (err) return next(err);
              var jwtTokenUser = {
                _id: user._id
              }
              var token = jwt.sign(jwtTokenUser,secret.secretKey, {
                expiresIn: 86400
              });
              return res.status(200).send({'message':'Registration Successfully done.', token:token,fullName:user.fullName,role:user.role});
            });
          });
        }
      });
    }
  });
});
router.post('/updateRole', function(req,res,next) {
  var params = req.body;
  User.update({'_id': params._id},{$set:{'role':params.role}}, function(err,updated) {
    if(err) return next(err)
    return res.status(200).send("User's role updated successfully.")
  })
})
router.post('/update', function(req, res, next) {
  var params = req.body;
  User.findOne({'_id':params._id}, function(err,user) {
    if(err) return next(err);
    if(user.email === params.email && user.mobileNumber === params.mobileNumber && user.username === params.username){
      return res.send('Profile already updated.')
    } else if(user.email === params.email && user.mobileNumber === params.mobileNumber) {
      User.findOne({username: params.username}, function(err, existingUser) {
        if(err) return next(err);
        if(existingUser) {
          return res.status(404).send('Account with that username already exists.');
        } else {
          User.update({'_id':params._id},params, function(err, user) {
            if (err) return next(err);
            return res.status(200).send('Username updated Successfully.');
          });
        }
      });
    } else if(user.email === params.email && user.username === params.username) {
      User.findOne({mobileNumber: params.mobileNumber}, function(err, existingUser) {
        if(err) return next(err);
        if(existingUser) {
          return res.status(404).send('Account with that mobile number already exists.');
        } else {
          User.update({"_id":params._id},params, function(err, user) {
            if (err) return next(err);
            return res.status(200).send('Mobile Number updated Successfully.');
          });
        }
      });
    } else if(user.mobileNumber === params.mobileNumber && user.username === params.username) {
      User.findOne({email: params.email}, function(err, existingUser) {
        if(err) return next(err);
        if(existingUser) {
          return res.status(404).send('Account with that email already exists.');
        } else {
          User.update({"_id":params._id},params, function(err, user) {
            if (err) return next(err);
            return res.status(200).send('Email address updated Successfully.');
          });
        }
      });
    } else if(user.email === params.email) {
      User.findOne({'mobileNumber': params.mobileNumber}, function(err, existingMobile) {
        if(err) return next(err);
        if (existingMobile) {
          return res.status(404).send('Account with that mobile number already exists.');
        } else {
          User.findOne({username: params.username}, function(err, existingUser) {
            if(err) return next(err);
            if(existingUser) {
              return res.status(404).send('Account with that username already exists.');
            } else {
              User.update({"_id":params._id},params, function(err, user) {
                if (err) return next(err);
                return res.status(200).send('Mobile number and Username updated Successfully.');
              });
            }
          });
        }
      });
    } else if(user.mobileNumber === params.mobileNumber) {
      User.findOne({'email': params.email}, function(err, existingEmail) {
        if(err) return next(err);
        if (existingEmail) {
          return res.status(404).send('Account with that email address already exists.');
        } else {
          User.findOne({'username': params.username}, function(err, existingUser) {
            if(err) return next(err);
            if(existingUser) {
              return res.status(404).send('Account with that username already exists.');
            } else {
              User.update({"_id":params._id},params, function(err, user) {
                if (err) return next(err);
                return res.status(200).send('Email address and Username updated Successfully.');
              });
            }
          });
        }
      });
    } else if(user.username === params.username){
      User.findOne({'email': params.email}, function(err, existingEmail) {
        if(err) return next(err);
        if (existingEmail) {
          return res.status(404).send('Account with that email address already exists.');
        } else {
          User.findOne({'mobileNumber': params.mobileNumber}, function(err, existingMobile) {
            if(err) return next(err);
            if(existingMobile) {
              return res.status(404).send('Account with that mobile number already exists.');
            } else {
              User.update({"_id":params._id},params, function(err, user) {
                if (err) return next(err);
                return res.status(200).send('Email address and Mobile number updated Successfully.');
              });
            }
          });
        }
      });
    } else {
      User.findOne({'email': params.email}, function(err, existingEmail) {
        if(err) return next(err);
        if (existingEmail) {
          return res.status(404).send('Account with that email address already exists.');
        } else {
          User.findOne({'mobileNumber': params.mobileNumber}, function(err, existingMobile) {
            if(err) return next(err);
            if(existingMobile) {
              return res.status(404).send('Account with that mobile number already exists.');
            } else {
              User.findOne({'username': params.username},function(err, existingUser) {
                if(err) return next(err);
                if(existingUser) {
                  return res.status(404).send('Account with that username already exists.');
                } else {
                  User.update({"_id":params._id},params, function(err, user) {
                    // if (err) return next(err);
                    return res.status(200).send('Email address, Username and Mobile number updated Successfully.');
                  });
                }
              })
            }
          });
        }
      });
    }
  })
});


module.exports = router;
