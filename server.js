const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const passport = require('passport');
// const flash = require('connect-flash');
// const session = require('express-session');
const PORT  = process.env.PORT || 5080

const app = express();

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


//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))



app.listen(PORT , console.log(`server started to ${PORT}`))

