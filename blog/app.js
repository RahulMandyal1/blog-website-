const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

// const likeIncrement = require('/javascript/addLike');
// Establishing  the connection between the server and our application 
mongoose.connect('mongodb://127.0.0.1:27017/blog',(err)=>{
  console.log(err ? err:'Connection is made successfully');
})

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const articleRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter); //all the stand alone routes are here 
app.use('/articles', articleRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
