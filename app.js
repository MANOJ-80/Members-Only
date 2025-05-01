
const path = require("node:path");
const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { sessionInit } = require("./config/passport");
const indexRouter = require("./routes/indexRouter");
const authuRouter = require("./routes/authRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(sessionInit);
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));


// routes

app.use('/', indexRouter);
app.use('/auth', authuRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

  
  
app.listen(3000, () => console.log("app listening on port 3000!"));
