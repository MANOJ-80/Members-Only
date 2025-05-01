
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sessionInit } = require("./config/passport");
const pool = require("./config/pool");
const indexRouter = require("./routes/indexRouter");
console.log("DB_URL", process.env.DB_URL);


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(sessionInit);
app.use(passport.session());


app.use(express.urlencoded({ extended: true }));


// routes


app.use((req, res, next) => {
    console.log("req.session", req.session);
    console.log("req.user", req.user);
    next();
})

app.use('/', indexRouter);

  
  
app.listen(3000, () => console.log("app listening on port 3000!"));
