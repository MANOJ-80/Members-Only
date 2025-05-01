const pool = require("../config/pool");
const { getAllPosts, updateMember } = require("../db/queries");
require('dotenv').config()

const indexPageController = async (req, res) => {
    const posts = await getAllPosts();
  //  console.log(posts);
    res.render("index", { user: req.user, posts: posts });
}


const getAddPost = (req, res) => {
    res.render("createPost");
}

const postAddPost = async (req, res) => {
    const { title, content } = req.body;
    const author_id = req.user.id;
    await pool.query("INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3)", [title, content, author_id]);
    res.redirect("/");
}   


const deletePost = async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.redirect("/");
}

const getMember = (req, res) => {
    res.render('member')
}

const postMember = async (req, res) => {
    const { code } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(400).send("User information is missing");
    }

    const id = req.user.id;
    if (code === process.env.CODE) {
        await updateMember(id);
        res.redirect('/')
    } else {
        res.status(400).send("Invalid code");
    }
}
module.exports = {
    indexPageController,
    getAddPost,
    postAddPost,
    deletePost,
    getMember,
    postMember
}

