const express  = require('express');
const router = express.Router();
const User  = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport');




router.get('/login', (req, res)=>{
   res.render('login')
})

router.get('/register', (req, res)=>{
    res.render('register')
}
)

router.post('/register',(req, res)=>{

    const {name , email, password, password2, roll} = req.body;
    const errors= [];
    if(!name || !email || !password|| !password2 ){
        errors.push({msg: 'please enter all fields'})
    }
    if(password.length <6){
        errors.push({msg: 'please enter valid password'})
    }
    if(password != password2){
        errors.push({msg: 'password dont match'})
    }
    if(errors.length >0){
        res.render('register', {
           errors,
           name,
           email,
           roll,
           password,
           password2 
        })
        
    }else{
        //validation passed 
        User.findOne({email: email})
        .then(user=>{
            
            
            if(user){
                //user already registered
                errors.push({msg: 'User already registered'})
                res.render('register',  {
                    errors,
                    name,
                    email,
                    roll,
                    password,
                    password2 
                 })
            }
            else{
                //user registering
                const newUser =  new User({
                    name,
                    email,
                    roll,
                    password,
                    
                })
               //hash password
               bcrypt.genSalt(10, (err, salt)=>
               
               bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err)  throw err;
                //set hashed password 
                newUser.password = hash;
                //save user
                newUser.save()
                .then((user =>{
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                    res.redirect('login')
                }))
                .catch( err =>{
                    console.log(err) 
                })
               })
               );
            }
        })
        .catch()
    }
    

})

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

module.exports = router