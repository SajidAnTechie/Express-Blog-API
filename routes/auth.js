const router = require("express").Router();

const { login } = require("../controller/auth");

router.post("/login", login);
module.exports = router;
