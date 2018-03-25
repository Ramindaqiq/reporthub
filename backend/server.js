
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var jwt = require('jsonwebtoken');
var MongoStore = require('connect-mongo/es5')(session);
var cors = require('cors');
var passport = require('passport');

var secret = require('./config/secret');
var User = require('./models/users');
var Form = require('./models/form');


var app = express();

mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(flash());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(cookieParser());
// app.use(session({
//   resave: true,
//   cookie: { maxAge: 60000 },
//   saveUninitialized: true,
//   secret: secret.secretKey,
//   store: new MongoStore({ url: secret.database, collection: 'sessions', autoReconnect: true})
// }));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Access, Authorization'
  );
  if(req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH, UPDATE');
    return res.status(200).json({})
  }
  next();
});



app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/users');
var formRoutes = require('./routes/form');

app.use('/',mainRoutes);
app.use('/form', formRoutes);
app.use('/users', userRoutes);

app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + secret.port);
});
