const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const ctrl = require("../controllers/bed.controller");
const upload = require("../middlewares/upload.middleware");
// CREATE BED
router.post("/create/:roomId", auth, role("owner", "admin"), upload.array("images",2), ctrl.createBed);

// GET ALL BEDS
router.get("/", ctrl.getBeds);

// GET BED BY ID
router.get("/:id", ctrl.getBedById);

// UPDATE BED
router.put("/:id", auth, role("owner", "admin"), upload.array("images",2), ctrl.updateBed);

// DELETE BED
router.delete("/:id", auth, role("owner", "admin"), upload.array("images",2), ctrl.deleteBed);

router.get("/search", ctrl.searchBeds);
router.get("/available", ctrl.getAvailableBeds);
module.exports = router;