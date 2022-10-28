const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const PORT  = process.env.PORT || 5080

const app = express();

// Passport Config
require('./config/passport')(passport);

//databse
const db = require('./config/keys').StringURI
//connect
mongoose.connect(db, )
.then( ()=> console.log('db connected successfully'))
.catch(err => console.log(err))

//setting up ejs 
app.use(expressLayouts)
app.set('view engine', 'ejs')

//body parser
app.use(express.urlencoded({extended: false}))



// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});  
//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



app.listen(PORT , console.log(`server started to ${PORT}`))

