const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/property.controller");

router.post("/create", auth, ctrl.createProperty);
router.get("/", ctrl.getAllProperties);
router.get("/:id", ctrl.getPropertyById);

module.exports = router;