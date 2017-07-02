const express = require('express'),
    Router = express.Router(),
    User = require('./user.model.js'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

Router.get('/register', (req, res) => {
    res.sendFile(__dirname+'/public/register.html');
});

Router.get('/login', (req, res) => {
    res.sendFile(__dirname+'/public/login.html');
});

Router.post('/register', (req, res) => {
    var newUser = new User(req.body);

    User.createUser(newUser, (err, user) => {
        if (err) {
            throw (err);
        }
        console.log(newUser);
    });
    req.flash('success_msg', 'you are registered and can login');
    res.sendFile(__dirname+'/public/login.html');
});

passport.use(new LocalStrategy((username, password, done) => {

    User.findOne({'email':username}, (err, user) => {
        if (err) throw err;

        if (!user) {
            return done(null, false, { 'message': 'unknown user' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, { 'message': 'password mismatch' });
            }
        });
    });

}));

passport.serializeUser(function (user,done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

 Router.post('/login', passport.authenticate('local', { successRedirect: '/', failiureRedirect: '/users/kashif', failiureFlash: true }),function (req, res) {
     res.redirect('/');
 });

 Router.get('/logout',(req,res) => {
    req.logout();
    res.redirect('login');
 });

module.exports = Router;