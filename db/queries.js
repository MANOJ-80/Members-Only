const pool = require("../config/pool");

const getAllPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}


module.exports = {
    getAllPosts,
}