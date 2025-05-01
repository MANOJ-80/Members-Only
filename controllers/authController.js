const passport = require("passport");
const pool = require("../config/pool");
const bcrypt = require("bcryptjs");




const getLogin = (req, res) => {
    const messages = req.session.messages || [];
    req.session.messages = [];
    res.render("login", { messages : messages || []});
   };

const getSignUp = (req, res) => {
    res.render("sign-up-form");
}

const getLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

const postLogin = (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
        failureMessage: true
    })(req, res);
}

const postSignUp = async (req, res, next) => {
    try {
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     await pool.query("insert into users (username, password) values ($1, $2)", [req.body.username, hashedPassword]);
     res.redirect("/log-in");
    } catch (error) {
       console.error(error);
       next(error);
      }
   };
   

module.exports = {
    getLogin,
    getSignUp,
    getLogout,
    postLogin,
    postSignUp
}