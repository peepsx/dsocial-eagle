var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var twitter = require('./routes/twitter');
var fbRouter = require('./routes/facebook');
var instagramRouter = require('./routes/instagram')
var google = require('./routes/google');
var users = require('./routes/users')
var transcation_id = require('./routes/rsn_transfer');
var testapi = require('./routes/test_api');
var fbshare = require('./routes/share_facebook');

var CORS = require('cors');
var app = express();
const bodyParser = require('body-parser');

// view engine setup
app.use(bodyParser.json());
app.use(CORS());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Api Routes
app.use('/api', testapi);
app.use('/twitter', twitter);
app.use('/facebook', fbRouter);
app.use('/instagram', instagramRouter)
app.use('/google',google)
app.use('/users',users)
app.use('/fbshare', fbshare)
app.use('/twshare', twitter)
/** TOKEN_EXCHANGE_API */
app.use('/transaction', transcation_id);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
