let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let email_send = require('./routes/sendGrid');
let mobile_send = require('./routes/mobileMessage');
let users = require('./routes/users')
let new_user = require('./routes/newuser');
let ip = require('./routes/ip');
let BtsTransfer = require('./routes/bit-share-transfer');
let CORS = require('cors');
let app = express();
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
app.use('/new_user', new_user);
app.use('/verify', email_send);
app.use('/mobile', mobile_send);
app.use('/', ip);
app.use('/users',users)
// app.use('/details',  telgramapi)
/** TOKEN_EXCHANGE_API */
app.use('/rsn-bts', BtsTransfer);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  if(req.accepts('json')) {
    return res.send({success: false, message: 'Page not found'})
  }
  // next(createError(404));
});
app.user
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
