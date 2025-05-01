const session = require("express-session");
const passport = require("passport");
const pool = require("./pool");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const sessionStore = require("./sessionStore");
require("dotenv").config();
console.log(process.env.SESSION_SECRET)

const sessionInit = session({ 
	secret: process.env.SESSION_SECRET, 
	resave: false, 
	saveUninitialized: true,
	store: sessionStore,
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
});

passport.use(
    new LocalStrategy(
        {usernameField: "username", passwordField: "password"},
    async (username, password, done) => {

    //console.log("input:", username, password);
    console.log('localStrategy has executed');
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
        console.log(user);
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }


        //console.log(password, user.password);

        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if (!match) {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
        console.log("pass match")
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });
  
module.exports = {sessionInit};