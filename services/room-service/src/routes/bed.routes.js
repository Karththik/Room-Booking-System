const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/bed.controller");

router.post("/create/:roomId", auth, ctrl.createBed);
router.get("/room/:roomId", ctrl.getBedsByRoom);

module.exports = router;