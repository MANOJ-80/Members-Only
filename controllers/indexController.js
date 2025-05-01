const { getAllPosts } = require("../db/queries");


const indexPageController = async (req, res) => {
    const posts = await getAllPosts();
    console.log(posts);
    res.render("index", { user: req.user, posts: posts });
}



module.exports = {
    indexPageController
}