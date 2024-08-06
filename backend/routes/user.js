const { login, addUser } = require("../controllers/user");

const router = require('express').Router();

router.post('/login', login)
    .post('/signup', addUser)


module.exports = router
