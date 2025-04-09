var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var mongoose = require('mongoose')
var   cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let constants = require("./utils/constants")
var app = express();

// Cấu hình CORS chi tiết
app.use(cors({
  origin: true, // Cho phép tất cả các origin
  credentials: true, // Cho phép gửi cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect("mongodb://localhost:27017/badminton_booking");
mongoose.connection.on('connected',()=>{
  console.log("connected");
})
// view engine setup
app.use(cookieParser(constants.SECRET_KEY_COOKIE));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', require('./routes/auth'));
app.use('/roles', require('./routes/roles'));
app.use('/events', require('./routes/events'));
app.use('/tickets', require('./routes/tickets'));
app.use('/oders', require('./routes/oders'));
app.use('/seats',require('./routes/seats'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // send JSON response
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
module.exports = app;
