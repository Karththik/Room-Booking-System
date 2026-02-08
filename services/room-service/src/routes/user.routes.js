const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);      // GET ALL
router.get("/:id", userController.getUserById);   // GET ONE
router.delete("/:id", userController.deleteUser); // DELETE

module.exports = router;
