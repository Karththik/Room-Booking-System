const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/room.controller");

router.post("/create/:propertyId", auth, ctrl.createRoom);
router.get("/property/:propertyId", ctrl.getRoomsByProperty);

module.exports = router;