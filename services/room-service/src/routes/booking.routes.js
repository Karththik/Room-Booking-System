const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/booking.controller");

router.post("/create", auth, ctrl.createBooking);
router.get("/my", auth, ctrl.myBookings);

module.exports = router;