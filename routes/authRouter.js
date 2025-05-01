const authuRouter = require("express").Router();
const { getSignUp, getLogin, getLogout, postLogin, postSignUp } = require("../controllers/authController");

// get routes
authuRouter.get('/sign-up', getSignUp);
authuRouter.get("/log-in", getLogin)

authuRouter.get("/log-out", getLogout)


// post routes
authuRouter.post("/sign-up", postSignUp)
 
authuRouter.post("/log-in", postLogin);


module.exports = authuRouter;
 