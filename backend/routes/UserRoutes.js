const router = require("express").Router()

const UserController = require("../controllers/UserController.js")

router.post('/register', UserController.register)

module.exports = router