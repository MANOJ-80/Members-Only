const { Router } = require("express");
const indexRouter = Router()
const { indexPageController, getAddPost, postAddPost, deletePost, getMember, postMember } = require("../controllers/indexController");
const { isAuth, isAdmin } = require("../controllers/authController");


// get routes
indexRouter.get("/", indexPageController)

indexRouter.get('/addpost',isAuth, getAddPost);
indexRouter.post('/addpost',isAuth, postAddPost);
  

indexRouter.post('/delpost/:id',isAdmin, deletePost)

indexRouter.get('/member',isAuth, getMember)

indexRouter.post('/member',isAuth, postMember)


module.exports = indexRouter;