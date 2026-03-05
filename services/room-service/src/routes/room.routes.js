const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const ctrl = require("../controllers/room.controller");

// CREATE ROOM
router.post("/create/:propertyId", auth, role("owner", "admin"), ctrl.createRoom);

// GET ALL ROOMS
router.get("/", ctrl.getRooms);

// GET ROOM BY ID
router.get("/:id", ctrl.getRoomById);

// UPDATE ROOM
router.put("/:id", auth, role("owner", "admin"), ctrl.updateRoom);

// DELETE ROOM
router.delete("/:id", auth, role("owner", "admin"), ctrl.deleteRoom);

router.get("/available", ctrl.getAvailableRooms);
router.get("/search", ctrl.searchRooms);
module.exports = router;