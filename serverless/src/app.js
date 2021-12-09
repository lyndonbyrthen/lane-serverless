const path = require('path');
const express = require('express');
const pug = require('pug').__express;
var createError = require('http-errors');
const cookieParser = require('cookie-parser');
// const { getCurrentInvoke } = require('@vendia/serverless-express')

const app = express();

app.set('env', process.env.env || 'local');

//template engine setup
app.set('view engine', 'pug');
app.engine('.pug', pug);
app.set('views', path.join(__dirname, 'views'));

app.set('assetPath', '');

if (app.get('env').toLowerCase() === 'local') {
  app.use(express.static(path.join(__dirname, '../../dist-assets')));
}

app.use(cookieParser());

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') !== 'prod' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
