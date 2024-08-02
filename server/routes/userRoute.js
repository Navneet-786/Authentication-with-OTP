const express = require("express");
const router = new express.Router();
const {
  handleRegister,
  userOtpSend,
  userLogin,
} = require("../controller/userController");
router.post("/user/register", handleRegister);
router.post("/user/sendotp", userOtpSend);
router.post("/user/login", userLogin);
module.exports = router;
