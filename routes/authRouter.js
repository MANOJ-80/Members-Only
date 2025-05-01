const authuRouter = require("express").Router();
const passport = require("passport");
const pool = require("../config/pool");
const bcrypt = require("bcryptjs");


const  isAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }

    else {
        res.status(401).json({ msg: "You are not authorized"})
    }
}


const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.role === "admin"){
        next()
    }

    else {
        res.status(401).json({ msg: "You are not authorized"})
    }
}

module.exports = {
    isAuth,
    isAdmin
}