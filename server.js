const express = require('express');
const expressLayouts = require('express-ejs-layouts');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('connect-flash');
// const session = require('express-session');
const PORT  = process.env.PORT || 5080

const app = express();

//setting up ejs 
app.use(expressLayouts)
app.set('view engine', 'ejs')


//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



app.listen(PORT , console.log(`server started to ${PORT}`))

