const pool = require("../config/pool");

const getAllPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows;
}

const updateMember = async (id) => {
    await pool.query("UPDATE users SET ROLE = 'member' WHERE id = $1", [id]);
    console.log("Membership Updated");
}
module.exports = {
    getAllPosts,
    updateMember
}