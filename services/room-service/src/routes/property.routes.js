const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const ctrl = require("../controllers/property.controller");
const upload = require("../middlewares/upload.middleware");
// CREATE PROPERTY → only owner/admin
router.post("/create", auth, role("owner", "admin"), upload.array("images", 5), ctrl.createProperty);

// GET ALL → public
router.get("/", ctrl.getAllProperties);

// GET BY ID → public
router.get("/:id", ctrl.getPropertyById);

// UPDATE → owner/admin
router.put("/:id", auth, role("owner", "admin"), upload.array("images", 5), ctrl.updateProperty);

// DELETE → owner/admin
router.delete("/:id", auth, role("owner", "admin"), upload.array("images", 5), ctrl.deleteProperty);

router.get("/search", ctrl.searchProperties);
module.exports = router;
