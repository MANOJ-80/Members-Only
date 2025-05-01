const { Router } = require("express");
const passport = require("passport");
const pool = require("../config/pool");
const indexRouter = Router()
const { isAuth, isAdmin } = require("./authRouter");
const { getAllPosts } = require("../db/queries");
const { indexPageController } = require("../controllers/indexController");
const { getSignUp, getLogin, getLogout, postLogin, postSignUp } = require("../controllers/authController");


// get routes
indexRouter.get("/", indexPageController)

indexRouter.get('/sign-up', getSignUp);
indexRouter.get("/log-in", getLogin)

indexRouter.get("/log-out", getLogout)


// post routes
indexRouter.post("/sign-up", postSignUp)
 
indexRouter.post("/log-in", postLogin);
   
  
   

// test route
indexRouter.get("/protected",isAuth, (req, res) => {
      res.send("This is a protected route");
    
  });

indexRouter.get("/admin",isAdmin ,(req, res) => {
      res.send("This is an admin route");
  })


module.exports = indexRouter;