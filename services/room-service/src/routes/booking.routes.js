const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const ctrl = require("../controllers/booking.controller");

router.post("/create", auth, role("student","tourist"), ctrl.createBooking);

router.get("/my", auth, ctrl.myBookings);

module.exports = router;