require('dotenv').config()
const passport = require('passport')
const localPassport = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../db.js')
const crypto = require('crypto')

passport.use("login", new localPassport({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
        User.findOne({where:{email}}).then(user => {
            if (!user) {
                return done(null, false, {message: "Usuario no encontrado o inexistente."})
            }
            if (!user.correctPassword(password)) {
                return done(null, false, {message: "Contraseña invalida"})
            }
            return done(null, user, {message: "Bienvenido de nuevo"})
        }).catch(err => done(err))
}))

passport.use('google-login', new GoogleStrategy({
    clientID: '385057609789-et5nab63d5m99h6ovumb8n9ip0a49dnu.apps.googleusercontent.com',
    clientSecret: 'XLP5l4zfPnE7uS9eUgF9myZp',
    callbackURL: "http://localhost:5000/user/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    let email = profile._json.email;
    User.findOne({where:{email}}).then(user => {
        if (user === null) {
            const password = crypto.randomBytes(10).toString('hex')
            User.create({
                name: profile.name.givenName,
                lastname: profile.name.familyName,
                email: email,
                password: password,
            }).then(newUser => {
                return done(null, newUser)
            })
        } else {
            return done(null, user)
        }
    })
  }
));


passport.serializeUser(function(user, done){
    done(null, user.id); // A este done se le pasa el null porque no hubo errores y luego el ID para serializar 
});

passport.deserializeUser(function(id,done){
    User.findOne({where:{id}})
    .then(user => {
      const userInfo = {
        username: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.idAdmin
      }
      done(null, userInfo);
    })
  });